import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// function for private urls which cant be accessed before login
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
                props => (
                    rest.loggedIn ?
                    (<Component {...props} {...rest} />)
                    :
                    (<Redirect to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                    />)
                )
            }
  />
);
export default PrivateRoute;
