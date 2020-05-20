import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import Header from '../Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should render', () => {
    const props = {
      position: 'fixed',
      title: 'title',
    };
    const wrapper = shallow(
      <Header {...props}>
        <div id="buttons" />
      </Header>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
