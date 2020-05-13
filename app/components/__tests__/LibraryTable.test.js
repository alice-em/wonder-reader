import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import LibraryItem from '../LibraryItem';
import LibraryTable, { generateLibraryItem, HeaderRow } from '../LibraryTable';

Enzyme.configure({ adapter: new Adapter() });

const generateContents = i => ({
  basename: `basename${i}`,
  dirname: `dirname${i}`,
  id: `id${i}`,
  isDirectory: i % 2 === 0,
});

const contents = [...Array(4).keys()].map(generateContents);

describe('LibraryTable', () => {
  it('should render', () => {
    const props = {
      contents,
      onContentClick: jest.fn(),
    };
    const wrapper = shallow(<LibraryTable {...props} />);
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
        .find(LibraryItem)
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
