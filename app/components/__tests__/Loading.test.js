import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import { Loading, PaperElement } from '../Loading';

Enzyme.configure({ adapter: new Adapter() });

describe('Loading', () => {
  const props = {
    classes: {
      root: 'sampleRoot',
      progress: 'sampleProgress',
    },
    isLoading: true,
  };
  it('should render', () => {
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render PaperElement', () => {
    const wrapper = shallow(<PaperElement {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
