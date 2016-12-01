
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import UserBox from './UserBox';

import MainScreen from './MainScreen';
import ItemScreen from './ItemScreen';
import PostScreen from './PostScreen';
import LoginRegisterScreen from './LoginRegisterScreen';
import NotificationScreen from './NotificationScreen';

class App extends React.Component {
  render() {
    return <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <Link to="/" style={{textDecoration: "none"}}><h1>Spartan Market</h1></Link>
        </div>
        <div className="col-xs-12 col-sm-6">
          <UserBox loggedIn={true} />
        </div>
      </div>
      <hr />

      {this.props.children ? this.props.children : <MainScreen />}

      <hr />

      <p>Copyright Troy/Dustin/Henry &copy; 2016</p>

    </div>
  }
}

var node = document.getElementById("app");
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/post" component={PostScreen}/>
      <Route path="/login" component={LoginRegisterScreen}/>
      <Route path="/notif" component={NotificationScreen}/>
      <Route path="/item/:itemId" component={ItemScreen}/>
      <Route path="*" component={MainScreen}/>
    </Route>
      </Router>
, node);
