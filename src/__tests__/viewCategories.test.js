import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import Categories ,{Category} from '../components/categories/Dashboard';
import CreateCategory from '../components/categories/CreateCategory';

describe('ViewCategories component', () => {
  const wrapper = shallow(<Categories />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders other components', () => {
    expect(wrapper.find(CreateCategory)).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(1);
    expect(wrapper.find('Search')).toHaveLength(1);
  });

  it('has a div', () => {
    expect(wrapper.find('div')).toHaveLength(6);
  });

  it('renders get categories functions', () => {
    expect(wrapper.find('getCategories')).toBeTruthy();
  });

  it('renders delete categpries functions', () => {
    expect(wrapper.find('deleteCategory')).toBeTruthy();
  });

  it('renders delete categories functions', () => {
    expect(wrapper.find('editCategory')).toBeTruthy();
  });

  it('renders change page functions', () => {
    expect(wrapper.find('changePage')).toBeTruthy();
  });

  it('has initial states', () => {
    expect(wrapper.state().categories).toEqual([]);
    expect(wrapper.state().Next_page).toEqual(null);
    expect(wrapper.state().Previous_page).toEqual(null);
    expect(wrapper.state().current_page).toEqual(null);
    expect(wrapper.state().total_pages).toEqual(null);
    expect(wrapper.state().total_Items).toEqual(null);
    expect(wrapper.state().searching).toEqual(false);
  });
});

describe('Category component', ()=>{
  const category ={id:1 , name: "lunch"}
  const wrapper = shallow(<Category {...category} editCategory={jest.fn()} deleteCategory={jest.fn()} />)

  it('renders correctly', ()=>{
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.find('.btn-primary .card-link').simulate('click')
    wrapper.find('.btn-danger .card-link').simulate('click')
  })
})