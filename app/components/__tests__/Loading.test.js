import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import { Loading } from '../Loading';

jest.mock('../../modules/File')

Enzyme.configure({ adapter: new Adapter() });

describe('Loading', () => {
  const props = {
    classes: {
      root: 'sampleRoot',
      progress: 'sampleProgress',
    },
    isLoading: true,
  };
  it('should render', () => {
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
