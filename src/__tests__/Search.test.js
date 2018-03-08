import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Search from '../components/SearchQuery';

describe('Search component',()=>{
    const wrapper = shallow(<Search handleSearch={jest.fn()}/>)
    const preventDefault = jest.fn();

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

    it('renders a form', () => {
        expect(wrapper.find('form')).toHaveLength(1);
        expect(wrapper.find('form').simulate('submit', {preventDefault}))
        expect(preventDefault).toBeCalled();
        expect(wrapper.find('[name="q"]').simulate('change', {target:{name:'q', value:'lunch'}}))
    });
})