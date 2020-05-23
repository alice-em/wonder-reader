import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import Item from '../Table/Item';

jest.mock('../../../modules/File');

Enzyme.configure({ adapter: new Adapter() });

const props = {
  basename: 'basename',
  dirname: 'dirname',
  id: 'id',
  isDirectory: true,
  onRowClick: jest.fn(),
};

describe('Item', () => {
  it('should render', () => {
    const wrapper = shallow(<Item {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
