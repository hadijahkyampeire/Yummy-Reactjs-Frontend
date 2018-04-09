import React from 'react';

const Profile = () => (
    <div className="modal fade" id="userprofile" tabIndex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-body">
      <div className="card"  >
  <div className="card-body text-center">
  <i className="fa fa-address-card fa-5x"/>
    <ul><h4 className="card-title ">User details</h4></ul>
    <p className="card-text"><strong>Email</strong>: {localStorage.getItem('userEmail')}</p>
    <p className="card-text"><strong>Username</strong>: {localStorage.getItem('username')}</p>
    <p className="card-text"><strong>Identity</strong>: {localStorage.getItem('identity')}</p>
  </div>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Back</button>
      </div>
    </div>
  </div>
</div>
    
);
export default Profile;

