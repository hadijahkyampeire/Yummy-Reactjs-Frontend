import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import EditRecipe from '../components/recipes/EditRecipe';

describe('EditRecipe component', () => {
  const wrapper = shallow(<EditRecipe  editRecipe={jest.fn()}/>);
  const preventDefault = jest.fn();

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has divs in a component', () => {
    expect(wrapper.find('div')).toHaveLength(8);
  });

  it('has headers h5 in a component', () => {
    expect(wrapper.find('h5')).toHaveLength(1);
  });
  it('has a form in a modal', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('has span in a modal', () => {
    expect(wrapper.find('span')).toHaveLength(1);
  });

  it('has button in a modal', () => {
    expect(wrapper.find('button')).toHaveLength(3);
  });

  it('has inputs in a modal', () => {
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('form').simulate('submit', {preventDefault}))
    expect(preventDefault).toBeCalled();
    expect(wrapper.find('[name="title"]').simulate('change', {target:{name:'title', value:'hi'}}))
  });

  it('calls component did mount', () => {
    sinon.spy(EditRecipe.prototype, 'componentWillMount');
    const fullWrapper = mount(<EditRecipe />);
    expect(EditRecipe.prototype.componentWillMount).toHaveProperty('callCount', 1);
    EditRecipe.prototype.componentWillMount.restore();
  });
});
