import React from 'react';
import { shallow} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Login from '../components/auth/Login';

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

  it('has the correct form fields', () => {
    expect(wrapper.find('#emailsignup')).toHaveLength(1);
    expect(wrapper.find('[name="password_field"]')).toHaveLength(1);
    expect(wrapper.find('#signin')).toHaveLength(1);
  });

  it('Form fields update when state changes', () => {
    wrapper.setState({ password_field: 'hi', email_field: 'mail' });
    expect(wrapper.find('#emailsignup').props().value).toEqual('mail');
    expect(wrapper.find('[name="password_field"]').props().value).toEqual('hi');
  });

  it('renders component in div', () => {
    expect(wrapper.find('div').length).toBe(9);
  });

  it('renders component in a form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders inputs', () => {
    expect(wrapper.find('input').length).toBe(2);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('it has br', () => {
    expect(wrapper.find('br').length).toBe(2);
  });

  it('submits data', () => {
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toBeCalled();
  });
});
