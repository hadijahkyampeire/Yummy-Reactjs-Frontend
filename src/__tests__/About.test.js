import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';


import About from '../components/auth/About';

describe('About component', () => {
  const wrapper = shallow(<About />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('it has a div', () => {
    expect(wrapper.find('div').length).toBe(1);
  });

  it('it has h1 and h4 headers', () => {
    expect(wrapper.find('h1').length).toBe(3);
    expect(wrapper.find('h4').length).toBe(3);
  });
});

