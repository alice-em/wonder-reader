import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import Item from '../Item';
import Table, { generateLibraryItem, HeaderRow } from '../Table';

Enzyme.configure({ adapter: new Adapter() });

const generateContents = i => ({
  basename: `basename${i}`,
  dirname: `dirname${i}`,
  id: `id${i}`,
  isDirectory: i % 2 === 0,
});

const contents = [...Array(4).keys()].map(generateContents);

describe('Table', () => {
  it('should render', () => {
    const props = {
      contents,
      onContentClick: jest.fn(),
    };
    const wrapper = shallow(<Table {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('generateLibraryItem', () => {
    it('should call onContentClick', () => {
      const onContentClick = jest.fn();
      const content = {
        basename: 'basename',
        dirname: 'dirname',
        id: 'sampleId',
        isDirectory: true,
      };
      const Wrapper = generateLibraryItem(onContentClick);
      const wrapper = shallow(<Wrapper {...content} />);
      wrapper
        .find(Item)
        .props()
        .onRowClick.call();
      expect(onContentClick).toHaveBeenCalledWith(content);
    });
  });

  describe('HeaderRow', () => {
    it('should render', () => {
      const wrapper = shallow(<HeaderRow />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
