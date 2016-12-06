
import React from 'react';

export default class SmartImage extends React.Component {
  render() {
    return <div className="smart-image" style={{
      display: "block",
      width: "100%",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundImage: "url(" + this.props.src + ")"
    }}>
    </div>
  }
}