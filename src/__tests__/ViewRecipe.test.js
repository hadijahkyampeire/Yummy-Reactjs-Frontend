import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import ViewRecipes, {Recipe} from '../components/recipes/ViewRecipes';

describe('ViewRecipes component', () => {
  const wrapper = shallow(<ViewRecipes match={{ params: {} }} location={{state:{}}} />);
  const recipe = {id: 1, title:'mockTitle', description:'mockDesc'}

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders other components', () => {
    expect(wrapper.find('CreateRecipe')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(1);
    expect(wrapper.find('Search')).toHaveLength(1);
  });

  it('has a div', () => {
    expect(wrapper.find('div')).toHaveLength(7);
  });

  it('has initial states', () => {
    expect(wrapper.state().recipes).toEqual([]);
    expect(wrapper.state().Next_page).toEqual(null);
    expect(wrapper.state().Previous_page).toEqual(null);
    expect(wrapper.state().current_page).toEqual(null);
    expect(wrapper.state().total_pages).toEqual(null);
    expect(wrapper.state().total_Items).toEqual(null);
    expect(wrapper.state().searching).toEqual(false);
  });

  it('renders get recipes functions', () => {
    expect(wrapper.find('getRecipes')).toBeTruthy();
  });

  it('renders delete recipes functions', () => {
    expect(wrapper.find('deleteRecipes')).toBeTruthy();
  });

  it('renders delete recipes functions', () => {
    expect(wrapper.find('editRecipes')).toBeTruthy();
  });

  it('renders change page functions', () => {
    expect(wrapper.find('changePage')).toBeTruthy();
  });

  it('renders recipes', ()=>{
    wrapper.setState({recipes: Array.from({length: 5}).fill({recipe})});
    expect(wrapper.find('#accordion').props().children).toHaveLength(5);
  })

  it('calls component did mount', () => {
    sinon.spy(ViewRecipes.prototype, 'componentDidMount');
    const fullWrapper = mount(<ViewRecipes match={{ params: {} }} location={{state:{}}}/>);
    expect(ViewRecipes.prototype.componentDidMount).toHaveProperty('callCount', 1);
    ViewRecipes.prototype.componentDidMount.restore();
  });
});

describe('Recipe', ()=>{
  const recipe = {id: 1, title:'mockTitle', description:'mockDesc'}
  const wrapper = shallow(<Recipe {...recipe} editRecipe={jest.fn()} deleteRecipe={jest.fn()} />)

  it('renders correctly', ()=>{
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.find('.word-font').simulate('click')
  });
});
