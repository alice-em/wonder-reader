import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import LibraryHeader from '../LibraryHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('LibraryHeader', () => {
  it('should render', () => {
    const props = {
      position: 'fixed',
      title: 'title',
    };
    const wrapper = shallow(
      <LibraryHeader {...props}>
        <div id="buttons" />
      </LibraryHeader>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
