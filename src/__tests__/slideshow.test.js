import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';
import Slideshow from '../components/SlideShow';

describe('Slideshow component', () => {
  const wrapper = shallow(<Slideshow />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders component in divs', () => {
    expect(wrapper.find('div')).toHaveLength(3);
  });

  it('renders component in span', () => {
    expect(wrapper.find('span')).toHaveLength(4);
  });

  it('renders component in li', () => {
    expect(wrapper.find('li')).toHaveLength(3);
  });

  it('renders component in ol', () => {
    expect(wrapper.find('ol')).toHaveLength(1);
  });
});
