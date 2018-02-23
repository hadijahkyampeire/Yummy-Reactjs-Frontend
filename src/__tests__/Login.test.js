import React from 'react';
import { shallow, enzyme } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import Login from '../components/auth/login';

describe('Login component', () => {
  const login = jest.fn();
  const wrapper = shallow(<MemoryRouter><Login login={login} loggedIn={false} /></MemoryRouter>);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  // it('it renders state initially', () => {
  //   expect(wrapper.state().password_field, email_field).toEqual(true);
  // });
});
