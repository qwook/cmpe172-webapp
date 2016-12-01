
import React from 'react';

import { Link } from 'react-router';

export default class UserBox extends React.Component {
  render() {
    console.log(this.props)
    return <div className="row">
      <div className="col-xs-8">
        {this.props.loggedIn}
        <br />
        { this.props.loggedIn ?
          <div className="pull-right" style={{textAlign: "right"}}>Welcome, <strong>User</strong>
            <p><Link to="/notif">1000 Notifications</Link></p>
          </div>
          :
          <div className="pull-right"> <Link to="/login">Login</Link> / <Link to="/login">Register</Link> </div>
        }
      </div>
      <div className="col-xs-4">
        <br />
        <Link to="/post" className="btn btn-success" style={{width: "100%"}}>
          + Post
        </Link>
      </div>
    </div>
  }
}