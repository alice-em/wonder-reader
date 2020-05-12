import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import PageViewer from '../PageViewer';

Enzyme.configure({ adapter: new Adapter() });

describe('PageViewer', () => {
  it('should render', () => {
    const wrapper = shallow(<PageViewer zoomLevel={100} />);
    expect(wrapper).toMatchSnapshot();
  });
});
