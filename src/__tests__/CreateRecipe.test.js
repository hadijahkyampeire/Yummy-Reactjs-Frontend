import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CreateRecipe from '../components/recipes/CreateRecipes';

describe('CreateRecipe component', () => {
  const wrapper = shallow(<CreateRecipe match={{ params: { id: 1 } }} />);
  const preventDefault = jest.fn();

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has initial state', () => {
    expect(wrapper.state().title).toEqual('');
    expect(wrapper.state().description).toEqual('');
  });

  it('updates state', () => {
    wrapper.setState({ title: 'lunch', description: 'cook' });
    expect(wrapper.find('[name="title"]').props().value).toEqual('lunch');
    expect(wrapper.find('[name="description"]').props().value).toEqual('cook');
  });

  it('has the correct form fields', () => {
    expect(wrapper.find('[name="title"]')).toHaveLength(1);
    expect(wrapper.find('[name="description"]')).toHaveLength(1);
  });

  it('has component in divs', () => {
    expect(wrapper.find('div')).toHaveLength(10);
  });

  it('renders component in spans', () => {
    expect(wrapper.find('span')).toHaveLength(3);
  });

  it('has input field', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('has breaks br field', () => {
    expect(wrapper.find('br')).toHaveLength(1);
  });

  it('renders a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
    expect(wrapper.find('[name="title"]').simulate('change', { target: { name: 'title', value: 'hi' } }));
  });
});
