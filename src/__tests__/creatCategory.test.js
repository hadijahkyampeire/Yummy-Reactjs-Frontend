import React from 'react';
import { shallow, enzyme } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import CreateCategory from '../components/categories/CreateCategory';

describe('Signup component', () => {
  const wrapper = shallow(<CreateCategory />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
