import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import CreateCategory from '../components/categories/CreateCategory';

describe('CreateCategory component', () => {
  const wrapper = shallow(<CreateCategory />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has initial state', () => {
    expect(wrapper.state().title).toEqual('');
  });

  it('changes state', () => {
    wrapper.setState({ title: 'lunch' });
    expect(wrapper.find('[name="title"]').props().value).toEqual('lunch');
  });

  it('has the correct form fields', () => {
    expect(wrapper.find('[name="title"]')).toHaveLength(1);
  });

  it('renders component in divs', () => {
    expect(wrapper.find('div')).toHaveLength(6);
  });

  it('renders component in spans', () => {
    expect(wrapper.find('span')).toHaveLength(1);
  });

  it('renders component in h2', () => {
    expect(wrapper.find('h2')).toHaveLength(1);
  });

  it('has input field', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('renders a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
});
