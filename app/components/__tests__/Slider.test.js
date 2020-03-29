import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import Slider from '../Slider';

Enzyme.configure({ adapter: new Adapter() });

describe('Slider', () => {
  const onChangeFunc = jest.fn();
  it('should render', () => {
    const wrapper = shallow(<Slider onChange={onChangeFunc} value={100} />);
    expect(wrapper).toMatchSnapshot();
  });
});
