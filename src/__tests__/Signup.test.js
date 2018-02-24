import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import Signup from '../components/auth/signup';

describe('Signup component', () => {
  const wrapper = shallow(<Signup />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('has a form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('has the correct form fields', () => {
    expect(wrapper.find('#emailsignup')).toHaveLength(1);
    expect(wrapper.find('[name="password_field"]')).toHaveLength(1);
    expect(wrapper.find('#signup')).toHaveLength(1);
  });

  it('has empty form fields', () => {
    expect(wrapper.find('#emailsignup').props().value).toEqual('');
    expect(wrapper.find('[name="password_field"]').props().value).toEqual('');
    expect(wrapper.find('#signup').props().value).toEqual('Signup');
  });

  it('Form fields update when state changes', () => {
    wrapper.setState({ password_field: 'hi', email_field: 'mail' });
    expect(wrapper.find('#emailsignup').props().value).toEqual('mail');
    expect(wrapper.find('[name="password_field"]').props().value).toEqual('hi');
  });
});
