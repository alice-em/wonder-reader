import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import Slider from '../Header/Slider';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

Enzyme.configure({ adapter: new Adapter() });

describe('Slider', () => {
  it('should render', () => {
    const wrapper = shallow(<Slider onChange={jest.fn()} value={100} />);
    expect(wrapper).toMatchSnapshot();
  });
});
