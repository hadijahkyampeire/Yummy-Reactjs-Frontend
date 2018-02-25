import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import PrivateRoute from '../components/auth/PrivateRoute';

describe('PrivateRoute component', () => {
  const wrapper = shallow(<PrivateRoute />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders the routes', () => {
    expect(wrapper.find('Route').length).toEqual(1);
  });
  
});
