import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import Table from '../Table/Table';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', () => {
  it('should render', () => {
    const wrapper = shallow(<Table />);
    expect(wrapper).toMatchSnapshot();
  });
});
