import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Pagination from '../components/Pagination';

describe('pagination component',()=>{
    const wrapper = shallow(<Pagination changePage={jest.fn()}/>)
    const preventDefault = jest.fn();

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

    it('renders a nav', () => {
    expect(wrapper.find('nav')).toHaveLength(1);
    expect(wrapper.find('nav').simulate('click', {preventDefault}))
    });
})