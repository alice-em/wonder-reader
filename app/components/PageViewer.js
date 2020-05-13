import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import generatePages from './generatePages';

class PageViewer extends Component {
  state = {
    // currentComicPage: null,
    // currentZoomLevel: 100,
    marginLeft: 0,
    marginTop: 0,
  };

  componentDidUpdate() {
    const { pages } = this.props;
    const { currentComicPage } = this.state;
    const pageViewer = document.querySelector('.PageViewer');
    // const pageWrapper = document.getElementById('pageWrapper');

    if (pages.length > 0) {
      if (currentComicPage !== pages[0].page) {
        pageViewer.scrollLeft = 0;
        pageViewer.scrollTop = 0;
        this.setState({ currentComicPage: pages[0].page }); // eslint-disable-line
        // } else if (P.zoomLevel >= 100 && S.currentZoomLevel !== P.zoomLevel) {
        //   // Center Points X || Y
        //   const cPX = pageViewer.scrollLeft + pageViewer.clientWidth / 2;
        //   const cPY = pageViewer.scrollTop + pageViewer.clientHeight / 2;
        //
        //   // Position Ratios to whole
        //   const cPXR = cPX / pageWrapper.clientWidth;
        //   const cPYR = cPY / pageWrapper.clientHeight;
        //
        //   const marginLeft =
        //     P.zoomLevel < 100 ? `${(100 - P.zoomLevel) / 2}%` : 0;
        //   const marginTop =
        //     pageViewer.clientHeight > pageWrapper.clientHeight
        //       ? `${(pageViewer.clientHeight - pageWrapper.clientHeight) / 2}px`
        //       : 0;
        //
        //   pageViewer.scrollTop =
        //     pageWrapper.clientHeight * cPXR - pageViewer.clientHeight / 2;
        //   pageViewer.scrollLeft =
        //     pageWrapper.clientWidth * cPYR - pageViewer.clientWidth / 2;
        //
        //   this.setState({
        //     // eslint-disable-line
        //     currentZoomLevel: P.zoomLevel,
        //     marginLeft,
        //     marginTop
        //   });
      }
    }
  }

  render() {
    // console.log('PageViewer:', this.props);
    const { pages, zoomLevel } = this.props;

    return (
      <ScrollContainer className="PageViewer dragscroll" hideScrollbars={false}>
        <div
          className="pages"
          style={{
            marginLeft: this.state.marginLeft,
            marginTop: this.state.marginTop,
            height: `${zoomLevel}%`,
            width: `${zoomLevel}%`,
          }}
        >
          {generatePages({ pages })}
        </div>
      </ScrollContainer>
    );
  }
}

PageViewer.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      page: PropTypes.string,
      width: PropTypes.number,
    }),
  ),
  zoomLevel: PropTypes.number.isRequired,
};

PageViewer.defaultProps = {
  pages: [],
};

export default PageViewer;
