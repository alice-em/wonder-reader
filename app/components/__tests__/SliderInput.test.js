import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import SliderInput from '../SliderInput';

Enzyme.configure({ adapter: new Adapter() });

describe('SliderInput', () => {
  const onChangeFunc = jest.fn();
  it('should render', () => {
    const wrapper = shallow(
      <SliderInput onChange={onChangeFunc} value={100} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
