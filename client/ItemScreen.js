
import React from 'react';
import Ajax from 'simple-ajax';

import SmartImage from './SmartImage';
import Comments from './Comments';

export default class ItemScreen extends React.Component {

  state = {
    commentHidden: false
  };

  componentWillMount() {    
    var ajax = new Ajax(
      {
        url: '/api/item/' + this.props.params.itemId,
        method: 'GET',
        contentType: 'application/json'
      }
    );

    ajax.on('success', (e) => {
      console.log(e.target.response);

      var res = JSON.parse(e.target.response);

      if (res.success) {
        this.setState({
          title: res.title,
          description: res.description,
          user: res.user,
          price: res.price,
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

  componentDidMount() {
    this.refs.commentInput.focus();
    $(this.refs.hideCommentButton).tooltip({selector: true, title: () => this.state.commentHidden ? "Only " + (this.state.user ? this.state.user.username : "ERR") + " can see this comment." : "Everyone can see this comment."});
  }

  toggleCommentHide() {
    this.setState({
      commentHidden: !this.state.commentHidden
    });
    // $(this.refs.hideCommentButton).tooltip('hide');
    setTimeout(() => $(this.refs.hideCommentButton).tooltip('show'), 0);
  }

  render() {
    console.log(this.props.params.itemId);
    return <div>
      <div className="row">
        <div className="col-xs-12">
          <p style={{fontWeight: "bold"}}>{this.state.user ? this.state.user.username : null}</p>
        </div>
      </div>
      <SmartImage src={"/image/" + this.props.params.itemId} />
      <br />
      <div className="row">
        <div className="col-xs-8">
          <h4>{this.state.title}</h4>
          <p>{this.state.description}</p>
        </div>
        <div className="col-xs-4">
          <p style={{fontWeight: "bold", color: "green", fontSize: "18pt"}}>${this.state.price}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-12">
          <Comments />
          <form className="input-group">
            <input className="form-control" type="text" ref="commentInput" />
            <span className="input-group-btn" ref="hideCommentButton" data-toggle="tooltip" data-placement="left">
              <div className="btn btn-default" onClick={this.toggleCommentHide.bind(this)}><span className={"glyphicon " + (this.state.commentHidden ? "glyphicon-eye-close" : "glyphicon-eye-open")} /></div>
            </span>
            <span className="input-group-btn">
              <input type="submit" className="btn btn-primary" value="Send"/>
            </span>
          </form>
        </div>
      </div>
    </div>
  }
}