import React from 'react';
import { shallow, enzyme } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import ViewRecipes from '../components/recipes/ViewRecipes';

describe('ViewRecipes component', () => {
  const wrapper = shallow(<ViewRecipes match={{ params: {} }} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
