
import React from 'react';

export default class SmartImage extends React.Component {
  render() {
    return <div style={{
      display: "block",
      width: "100%",
      height: "200px",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundImage: "url(" + this.props.src + ")"
    }}>
    </div>
  }
}