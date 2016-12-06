
import React from 'react';

export default class Comments extends React.Component {
  static defaultProps = {
    comments: []
  };

  render() {
    console.log(this.props.comments);
    return <div style={{overflow: "hidden", height: this.props.crop ? "80px" : "default"}} className={this.props.crop ? "cropped-comment" : ""}>
      {this.props.comments ? this.props.comments.map((comment) =>
        <p key={comment._id}><strong>{comment.user.username}</strong>&nbsp;{comment.content}</p>
      ) : null}
    </div>
  }
}

// <p><strong><a href="#">Load More Comments...</a></strong></p>