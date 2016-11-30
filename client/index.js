
import React from 'react';
import ReactDOM from 'react-dom';

import UserBox from './UserBox';
import ItemBox from './ItemBox';

class App extends React.Component {
  render() {
    return <div className="container">
      <div className="row">
        <div className="col-xs-8">
          <h1>Spartan Market</h1>
        </div>
        <div className="col-xs-4">
          <UserBox loggedIn={true} />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-12">
          <ItemBox />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <ItemBox />
        </div>
      </div>

      <div className="btn btn-primary" style={{width: "100%"}}>
        Load More
      </div>
      <hr />

    </div>
  }
}

var node = document.getElementById("app");
ReactDOM.render(<App />, node);
