import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import { FaRegFolderOpen, FaRegFileArchive } from 'react-icons/fa';

import ItemIcon from '../Table/ItemIcon';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  iconSize: 30,
  isDirectory: true,
};

describe('LibraryItem', () => {
  it('should render', () => {
    const wrapper = shallow(<ItemIcon {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have FaFolderO as an icon for isDirectory = true', () => {
    const wrapper = shallow(<ItemIcon iconSize={30} isDirectory />);
    expect(wrapper.find(FaRegFileArchive)).toHaveLength(0);
    expect(wrapper.find(FaRegFolderOpen)).toHaveLength(1);
  });

  it('should have FaFileArchiveO as an icon for isDirectory = true', () => {
    const wrapper = shallow(
      <ItemIcon iconSize={30} isDirectory={false} />,
    );
    expect(wrapper.find(FaRegFileArchive)).toHaveLength(1);
    expect(wrapper.find(FaRegFolderOpen)).toHaveLength(0);
  });
});
