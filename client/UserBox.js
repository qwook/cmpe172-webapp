
import React from 'react';

export default class UserBox extends React.Component {
  render() {
    console.log(this.props)
    return <div>
      {this.props.loggedIn}
      <br />
      { this.props.loggedIn ?
        <div className="pull-right" style={{textAlign: "right"}}>Welcome, <strong>User</strong>
          <p><a href="#">1000 Notifications</a></p>
        </div>
        :
        <div className="pull-right"> <a href="#">Login</a> / <a>Register</a> </div>
      }
    </div>
  }
}