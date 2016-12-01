
import React from 'react';
import Ajax from 'simple-ajax';

import ItemBox from './ItemBox';

export default class ItemScreen extends React.Component {

  state = {
    posts: []
  };

  componentWillMount() {    
    var ajax = new Ajax(
      {
        url: '/api/feed/',
        method: 'GET',
        contentType: 'application/json'
      }
    );

    ajax.on('success', (e) => {
      console.log(e.target.response);

      var res = JSON.parse(e.target.response);

      if (res.success) {
        this.setState({
          posts: res.posts
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
    return <div>

      {this.state.posts.map((post) => 
        <div key={post._id} className="row">
          <div className="col-xs-12">
            <ItemBox post={post} />
          </div>
        </div>
      )}

      <div className="btn btn-primary" style={{width: "100%"}}>
        Load More
      </div>

    </div>
  }
}