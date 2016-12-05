
import React from 'react';

import SmartImage from './SmartImage';
import Comments from './Comments';

import { Link } from 'react-router';

export default class ItemBox extends React.Component {
  render() {
    return <div className="panel panel-default">
      <div className="panel-body">
        <p style={{fontWeight: "bold"}}>{this.props.post.user.username}</p>
      </div>
      <SmartImage src={"/image/" + this.props.post._id} />
      <div className="panel-body">
        <div className="row">
          <div className="col-xs-8">
            <h4>{this.props.post.title}</h4>
            <p>{this.props.post.description}</p>
          </div>
          <div className="col-xs-4">
            <p style={{fontWeight: "bold", color: "green", fontSize: "18pt"}}>${this.props.post.price}</p>
            <p><Link to={"/item/" + this.props.post._id} className="btn btn-default">Contact</Link></p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-12">
            <Comments comments={this.props.post.comments} />
          </div>
        </div>
      </div>
    </div>
  }
}