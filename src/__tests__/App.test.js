import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import App from '../App';
import { Nav } from '../components/auth/landing';
import PrivateRoute from '../components/auth/PrivateRoute';

describe('App component', () => {
  const wrapper = shallow(<App />);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has the the expected components', () => {
    expect(wrapper.find('BrowserRouter')).toHaveLength(1);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('renders a Nav component in the div', () => {
    expect(wrapper.find('div').props().children.find(Nav)).toBeTruthy();
  });

  it('renders the routes', () => {
    expect(wrapper.find('Route').length).toEqual(5);
    expect(wrapper.find('PrivateRoute').length).toEqual(3);
  });

  it('renders the switch', () => {
    expect(wrapper.find('Switch')).toHaveLength(1);
  });

  it('renders the notifications wrapper', () => {
    expect(wrapper.find('_class')).toHaveLength(1);
  });

  it('has the right initial state', () => {
    expect(wrapper.state().loggedin).toBeFalsy();
  });

  it('calls component did mount', () => {
    sinon.spy(App.prototype, 'componentDidMount');
    const fullWrapper = mount(<App />);
    expect(App.prototype.componentDidMount).toHaveProperty('callCount', 1);
    App.prototype.componentDidMount.restore();
  });

  it('fully renders properly', () => {
    const fullWrapper = mount(<App />);
    expect(toJson(fullWrapper)).toMatchSnapshot();
    expect(fullWrapper.find('Landing')).toHaveLength(1);
  });
});
