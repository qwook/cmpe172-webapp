
import React from 'react';
import Ajax from 'simple-ajax';

import SmartImage from './SmartImage';
import Comments from './Comments';

import { Link } from 'react-router';

export default class ItemBox extends React.Component {

  state = {
    comments: []
  }

  componentDidMount() {
    this.loadComments();
  }

  loadComments() {
    var ajax = new Ajax(
      {
        url: '/api/comments/' + this.props.post._id,
        method: 'GET',
        contentType: 'application/json'
      }
    );

    ajax.on('success', (e) => {
      console.log(e.target.response);

      var res = JSON.parse(e.target.response);

      if (res.success) {
        this.setState({
          comments: res.comments
        });
      } else {
        this.setState({
          error: res.err
        });
      }
    });

    ajax.on('error', () => {
      this.setState({
        error: "Ajax Error",
        loading: false
      });
    });

    ajax.send();
  }

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
            <Comments comments={this.state.comments} crop="true" />
          </div>
        </div>
      </div>
    </div>
  }
}