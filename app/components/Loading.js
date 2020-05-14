import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

/* istanbul ignore next */
const styles = theme => ({
  LoaderElement: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100vh',
    width: '100vw',
    zIndex: '1301',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  Paper: {
    height: '50px',
    width: '50px',
    margin: 'auto',
    marginTop: '30vh',
  },
  root: theme.mixins.gutters({
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing(3),
  }),
});

const PaperElement = ({ classes }) => (
  <div style={styles.LoaderElement}>
    <Paper className={classes.root} elevation={4} style={styles.Paper}>
      <CircularProgress
        className={classes.progress}
        color="secondary"
        size={50}
      />
    </Paper>
  </div>
);

const Loading = ({ classes, isLoading }) =>
  isLoading && <PaperElement classes={classes} />;

Loading.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  isLoading: PropTypes.bool.isRequired,
};

export { Loading, PaperElement };
export default withStyles(styles)(Loading);
