import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import { FaFolderO, FaFileArchiveO } from 'react-icons/lib/fa';

import LibraryItemIcon from '../LibraryItemIcon';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  iconSize: 30,
  isDirectory: true,
};

describe('LibraryItem', () => {
  it('should render', () => {
    const wrapper = shallow(<LibraryItemIcon {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have FaFolderO as an icon for isDirectory = true', () => {
    const wrapper = shallow(<LibraryItemIcon iconSize={30} isDirectory />);
    expect(wrapper.find(FaFileArchiveO)).toHaveLength(0);
    expect(wrapper.find(FaFolderO)).toHaveLength(1);
  });

  it('should have FaFileArchiveO as an icon for isDirectory = true', () => {
    const wrapper = shallow(
      <LibraryItemIcon iconSize={30} isDirectory={false} />,
    );
    expect(wrapper.find(FaFileArchiveO)).toHaveLength(1);
    expect(wrapper.find(FaFolderO)).toHaveLength(0);
  });
});
