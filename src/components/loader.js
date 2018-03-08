import React from 'react';

const Loader = props => (
  <div className="row">
    <div className="col-xs-2 xs-offset-5">
      <div className="loader" />
      {props.message}
    </div>
  </div>
);
export default Loader;
