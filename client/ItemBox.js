
import React from 'react';

import SmartImage from './SmartImage';
import Comments from './Comments';

export default class ItemBox extends React.Component {
  render() {
    return <div className="panel panel-default">
      <SmartImage src="http://placehold.it/500x500" />
      <div className="panel-body">
        <div className="row">
          <div className="col-xs-8">
            <h4>Tickets to Some Show</h4>
            <p>Yeah yeah yeah!</p>
          </div>
          <div className="col-xs-4">
            <p style={{fontWeight: "bold", color: "green", fontSize: "18pt"}}>$100</p>
            <p><div className="btn btn-success">Contact</div></p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-12">
            <Comments />
          </div>
        </div>
      </div>
    </div>
  }
}