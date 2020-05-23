import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import { Layout } from '../Layout';

jest.mock('../../../modules/File');

Enzyme.configure({ adapter: new Adapter() });

describe('Layout', () => {
  it('should render', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper).toMatchSnapshot();
  });
});
