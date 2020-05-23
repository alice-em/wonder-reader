import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import { Header } from '../Header';

jest.mock('../../../modules/File');

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should render', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
