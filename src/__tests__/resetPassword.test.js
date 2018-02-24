import React from 'react';
import { shallow, enzyme } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import ResetPassword from '../components/auth/resetPassword';

describe('ResetPassword component', () => {
  const wrapper = shallow(<ResetPassword location={{ search: 'testUrl' }} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
