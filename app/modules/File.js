// To handle file extraction, error checking, and for setting temp directories
import { isImage, strainImages } from './strain';

const fs = require('fs');
const isDirectory = require('is-directory');
const isRar = require('is-rar');
const isZip = require('is-zip');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const rar = require('@fknop/node-unrar');
const rimraf = require('rimraf');
const StreamZip = require('node-stream-zip');
const Unrar = require('node-unrar');

const temp = path.join(os.tmpdir(), 'wonderReader');
const regex = /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|,|\.|>|\?|\/|""|;|:/gi;

const failedTempDir = 'Error: Failed to create temp folder';
const failedFileType =
  'Error: File must be a CBR or CBZ. Compression method is incorrect;';

class File {
  constructor(filepath) {
    this.name = path.basename(filepath);
    this.basename = path
      .basename(this.name, path.extname(this.name))
      .replace(regex, '');
    this.tempdir = path.join(temp, this.basename.toLowerCase());
    this.extname = path.extname(this.name).toLowerCase();
    this.origin = filepath;

    this.pending = 0;
    this.error = false;
    this.errorMessage = '';
    this.data = '';
  }

  extract(cb) {
    // CB returns a new comic object
    fs.readFile(this.origin, (err, data) => {
      if (!err) {
        this.data = data;
        if (isDirectory.sync(this.tempdir)) {
          rimraf.sync(this.tempdir);
        }
        mkdirp(this.tempdir, (errd) => {
          this.routeExtraction(errd, cb);
        });
      }
    });
  }

  // TODO: see how to create a deb file with dependencies
  // TODO: create snap with dependencies
  extractRarLinux(cb) {
    const unrar = new Unrar(this.origin);
    unrar.extract(this.tempdir, null, (err) => {
      if (err) {
        this.error = true;
      } else {
        this.standardize(this.tempdir);
        this.updatePages(cb);
      }
    });
  }

  extractRar(cb) {
    if (os.platform() === 'linux') {
      this.extractRarLinux(cb);
    } else {
      rar.extract(this.origin, this.tempdir);
      this.standardize(this.tempdir);
      this.updatePages(cb);
    }
  }

  extractZip(cb) {
    const zip = new StreamZip({
      file: this.origin,
      storeEntries: true,
    });
    zip.on('ready', () => {
      zip.extract(null, this.tempdir, () => {
        this.standardize(this.tempdir);
        this.updatePages(cb);
      });
    });
  }

  fileMover(filepath) {
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      this.standardize(filepath);
      if (filepath !== this.tempdir) {
        rimraf.sync(filepath);
      }
    } else if (stats.isFile() && isImage(filepath)) {
      const basename = path.basename(filepath);
      const output = path.join(this.tempdir, basename);
      fs.renameSync(filepath, output);
    } else {
      rimraf.sync(filepath);
    }
  }

  isRar = () => isRar(this.data);

  isZip = () => isZip(this.data);

  routeExtraction = (err, cb) => {
    if (err) {
      this.error = true;
      this.errorMessage = failedTempDir;
    } else if (this.isRar()) {
      this.extractRar(cb);
    } else if (this.isZip()) {
      this.extractZip(cb);
    } else {
      this.error = true;
      this.errorMessage = failedFileType;
    }
  };

  standardize(directory) {
    // initialize with this.tempdir
    const files = fs.readdirSync(directory);
    const filepaths = files.map(file => path.join(directory, file));
    filepaths.forEach((filepath) => {
      this.fileMover(filepath);
    });
  }

  updatePages(cb) {
    fs.readdir(this.tempdir, (err, files) => {
      const strainedFiles = strainImages(files);
      this.pages = strainedFiles;
      cb(this);
    });
  }
}

export default File;
