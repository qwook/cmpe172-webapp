
import React from 'react';

export default class LoginRegisterScreen extends React.Component {
  render() {
    return <div>
      <form className="form-horizontal">
          <div className="form-group">
              <label for="inputEmail3" className="col-sm-2 control-label">Name</label>
              <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputEmail3" placeholder="Name" />
              </div>
          </div>
          <div className="form-group">
              <label for="inputPassword3" className="col-sm-2 control-label">Password</label>
              <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
              </div>
          </div>
          <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">Sign in</button>
              </div>
          </div>
      </form>
    </div>
  }
}