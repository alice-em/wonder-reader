import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import LibraryItem from '../LibraryItem';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  basename: 'basename',
  dirname: 'dirname',
  id: 'id',
  isDirectory: true,
  onRowClick: jest.fn(),
};

describe('LibraryItem', () => {
  it('should render', () => {
    const wrapper = shallow(<LibraryItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
