import React from 'react';
import { shallow, enzyme } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import ResetPassword from '../components/auth/ResetPassword';

describe('ResetPassword component', () => {
  const wrapper = shallow(<ResetPassword location={{ search: 'testUrl' }} />);
  const preventDefault = jest.fn();
  

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders initial states', () => {
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().retyped_password).toEqual('');
  });

  it('renders a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('form').simulate('submit', {preventDefault}))
    expect(preventDefault).toBeCalled();
    expect(wrapper.find('[name="email"]').simulate('change', {target:{name:'email', value:'had@hmail.com'}}))
  });

  it('renders a button', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('has divs', () => {
    expect(wrapper.find('div')).toHaveLength(6);
  });

  it('has span', () => {
    expect(wrapper.find('span')).toHaveLength(3);
  });

  it('has icon h3', () => {
    expect(wrapper.find('h3')).toHaveLength(1);
  });

  it('has inputs', () => {
    expect(wrapper.find('input')).toHaveLength(3);
  });

  it('has br', () => {
    expect(wrapper.find('br')).toHaveLength(3);
  });
});
