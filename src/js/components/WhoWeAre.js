import React from 'react';
import ReactMarkdown from 'react-markdown';

class WhoWeAre extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('whoWeAre') || {};
  }

  render() {
    return (
      <div id="whoweare" className="who-we-are-container">
        <h2 className="gold-gradient-color viewport-animation animated fadeInUp">{this.state.title}</h2>
        <ReactMarkdown source={this.state.text} className="viewport-animation animated fadeInUp delay-250" />
        <button aria-label={this.state.ctaLabel} className="btn btn-gold btn-block viewport-animation animated fadeInUp delay-500">{this.state.ctaLabel}</button>
      </div>
    );
  }

}

export { WhoWeAre };
export default WhoWeAre;