import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Icon } from 'react-fa';

class WhatWeDo extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('whatWeDo') || {};
  }

  render() {
    return (
      <div id="whatwedo" className="what-we-do-container">
        <Icon name="compass" size="2x" className="what-we-do-icon animated bounceIn delay-100" />
        <h2 className=" animated bounceIn delay-250">{this.state.title}</h2>
        <ReactMarkdown source={this.state.text} className=" animated bounceIn delay-500" />
      </div>
    );
  }

}

export { WhatWeDo };
export default WhatWeDo;