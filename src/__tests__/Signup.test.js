import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Signup from '../components/auth/Signup';

describe('Signup component', () => {
  const wrapper = shallow(<Signup />);
  const preventDefault = jest.fn();

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('has a form', () => {
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });

  it('renders inputs', () => {
    expect(wrapper.find('input').length).toBe(4);
  });

  it('renders component in div', () => {
    expect(wrapper.find('div').length).toBe(9);
  });

  it('renders component in span', () => {
    expect(wrapper.find('span').length).toBe(3);
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
