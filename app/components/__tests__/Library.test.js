import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import { Library } from '../Library';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  classes: { list: 'classes.list' },
  closeDrawer: jest.fn(),
  loadedLibrary: './',
  open: true,
  openComic: jest.fn(),
  saveContentDataToMain: jest.fn(),
  style: {},
};

describe('Library', () => {
  it('should render', () => {
    const wrapper = shallow(<Library {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state with { root: filename }', () => {
    const sampleFilepath = 'sampleFilepath';
    const sampleLibrary = new Library({ loadedLibrary: 'root' });
    sampleLibrary.setState = jest.fn();
    sampleLibrary.updateRoot(sampleFilepath);
    expect(sampleLibrary.setState).toHaveBeenCalledWith({
      root: sampleFilepath,
    });
  });
});
