import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import Page from '../Page';

Enzyme.configure({ adapter: new Adapter() });

describe('Page', () => {
  it('should render', () => {
    const props = {
      alt: 'alt',
      id: 'id',
      src: 'src',
      width: 500,
    };
    const wrapper = shallow(<Page {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
