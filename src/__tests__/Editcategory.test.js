import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import EditCategory from '../components/categories/editCategory';

describe('EditCategory component', () => {
  const wrapper = shallow(<EditCategory />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has divs in a component', () => {
    expect(wrapper.find('div')).toHaveLength(7);
  });

  it('has headers h5 in a component', () => {
    expect(wrapper.find('h5')).toHaveLength(1);
  });

  it('has inputs in a modal', () => {
    expect(wrapper.find('input')).toHaveLength(1);
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

  it('calls component did mount', () => {
    sinon.spy(EditCategory.prototype, 'componentWillMount');
    const fullWrapper = mount(<EditCategory />);
    expect(EditCategory.prototype.componentWillMount).toHaveProperty('callCount', 1);
    EditCategory.prototype.componentWillMount.restore();
  });
});
