import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import Landing from '../components/auth/Landing';


describe('Landing component', () => {
  const wrapper = shallow(<Landing />);

  it('reanders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('calls component did mount', () => {
    sinon.spy(Landing.prototype, 'componentDidMount');
    const fullWrapper = mount(<Landing />);
    expect(Landing.prototype.componentDidMount).toHaveProperty('callCount', 1);
    Landing.prototype.componentDidMount.restore();
  });

  it('renders a clock component', () => {
    expect(wrapper.find('Clock')).toBeTruthy();
  });
});
