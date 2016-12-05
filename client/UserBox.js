
import React from 'react';
import Ajax from 'simple-ajax';

import User from './User';

import { Link } from 'react-router';

export default class UserBox extends React.Component {
  state = {
    user: {loggedIn: false}
  };

  componentWillMount() {
    this.loggedInFn = this.loggedIn.bind(this);
    User.addListener(this.loggedInFn);
  }

  componentWillUnmount() {
    User.removeListener(this.loggedInFn);
  }

  loggedIn(state) {
    console.log(state);
    this.setState({
      user: state
    });
  }

  logOut(e) {

    var ajax = new Ajax(
      {
        url: '/api/logout',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({})
      }
    );

    ajax.on('success', (e) => {
      window.location = '/';
    });

    ajax.on('error', () => {
    });

    ajax.send();

    e.preventDefault();

  }

  render() {
    console.log(this.props)
    return <div className="row">
      { this.state.user.loggedIn ?
        <div>
          <div className="col-xs-8">
            <br />
                <div className="pull-right" style={{textAlign: "right"}}>Welcome, <strong>{this.state.user.username}</strong>
                  <p><a href="#" onClick={this.logOut.bind(this)}>Logout</a></p>
                  {/*<p><Link to="/notif">0 Notifications</Link></p>*/}
                </div>
          </div>
          <div className="col-xs-4">
            <br />
            <Link to="/post" className="btn btn-success" style={{width: "100%"}}>
              + Post
            </Link>
          </div>
        </div>
        :
        <div className="col-xs-12">
          <br />
          <div className="pull-right"> <Link to="/login">Login</Link> / <Link to="/login">Register</Link> </div>
        </div>
      }
    </div>
  }
}