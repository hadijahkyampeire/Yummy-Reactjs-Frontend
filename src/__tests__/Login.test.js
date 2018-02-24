import React from 'react';
import { shallow, enzyme } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import Login from '../components/auth/login';

describe('Login component', () => {
  const login = jest.fn();
  const wrapper = shallow(<Login login={login} loggedIn={false} location={{}} />);
  const preventDefault = jest.fn();

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('it renders state initially', () => {
    expect(wrapper.state().email_field).toEqual('');
    expect(wrapper.state().password_field).toEqual('');
  });

  it('renders component in div', () => {
    expect(wrapper.find('div').length).toBe(6);
  });

  it('renders component in a form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders inputs', () => {
    expect(wrapper.find('input').length).toBe(2);
  });

  it('submits data', () => {
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toBeCalled();
  });
});
