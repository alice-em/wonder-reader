import Adapter from 'enzyme-adapter-react-16';
import electron from 'electron';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import Layout from '../Layout';
import Table from '../Table';

const {
  generateNestedContentFromFilepath,
} = require('../../../modules/generate.js');

jest.mock('electron', () => ({
  remote: {
    dialog: { showOpenDialog: jest.fn() },
  },
}));
jest.mock('../../../modules/generate.js', () => ({
  generateNestedContentFromFilepath: jest.fn(),
}));

Enzyme.configure({ adapter: new Adapter() });

const props = {
  closeLibrary: jest.fn(),
  openComic: jest.fn(),
  loadedLibrary: '.',
  saveContentDataToParent: jest.fn(),
  updateRoot: jest.fn(),
};

const sampleContent = {
  contents: [],
  dirname: '',
  fullpath: null,
  id: 'libraryRoot',
  isDirectory: true,
  root: '.',
};

describe('Layout', () => {
  it('should render', () => {
    const wrapper = shallow(<Layout {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Table with a truthy state.fullpath', () => {
    const wrapper = shallow(<Layout {...props} />);
    wrapper.setState({ fullpath: 'sample' });
    expect(wrapper.find(Table)).toHaveLength(1);
  });

  describe('Class Functions', () => {
    describe('onClick', () => {
      const fullpath = 'sample';
      const createArguments = isDirectory => ({
        fullpath,
        isDirectory,
      });
      it('should updateContent if target.isDirectory', () => {
        const wrapper = new Layout(props);
        wrapper.updateContent = jest.fn();
        wrapper.onClick(createArguments(true));
        expect(wrapper.updateContent).toHaveBeenCalledWith(fullpath);
      });

      it('should props.openComic if !target.isDirectory', () => {
        const wrapper = new Layout(props);
        wrapper.updateContent = jest.fn();
        wrapper.onClick(createArguments(false));
        expect(props.openComic).toHaveBeenCalledWith(fullpath);
      });
    });

    describe('openDirectory', () => {
      it('should show dialog', () => {
        const wrapper = new Layout(props);
        wrapper.openDirectory();
        expect(electron.remote.dialog.showOpenDialog).toHaveBeenCalledWith(
          { properties: ['openDirectory'] },
          wrapper.updateRoot,
        );
      });
    });

    describe('setContentToState', () => {
      it('sets state to content argument', (done) => {
        const wrapper = new Layout(props);
        wrapper.setState = jest.fn();
        wrapper.setContentToState(sampleContent);
        expect(wrapper.setState).toHaveBeenCalledWith(sampleContent);
        done();
      });
    });

    describe('setParentAsLibrary', () => {
      it('sets state based on dirname state', (done) => {
        const wrapper = new Layout(props);
        wrapper.setParentAsLibrary();
        expect(wrapper.state).toEqual(sampleContent);
        done();
      });
    });

    describe('updateContent', () => {
      it('should generateNestedContent and set that data to state', () => {
        const wrapper = new Layout(props);
        wrapper.setContentToState = jest.fn();
        wrapper.updateContent('.');
        expect(generateNestedContentFromFilepath).toHaveBeenCalledWith(
          '.',
          wrapper.setContentToState,
        );
      });
    });

    describe('updateRoot', () => {
      it('should updateContent with a valid [filepath]', () => {
        const sampleFilepath = 'sample';
        const wrapper = new Layout(props);
        wrapper.updateContent = jest.fn();
        wrapper.updateRoot([sampleFilepath]);
        expect(wrapper.updateContent).toHaveBeenCalledWith(sampleFilepath);
      });

      it('should not updateContent with a invalid [filepath]', () => {
        const sampleFilepath = '';
        const wrapper = new Layout(props);
        wrapper.updateContent = jest.fn();
        wrapper.updateRoot([sampleFilepath]);
        expect(wrapper.updateContent).not.toHaveBeenCalled();
      });
    });
  });
});
