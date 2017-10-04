import React from 'react';
import ReactMarkdown from 'react-markdown';

class HeroFooter extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('footerHero') || {};
  }

  render() {
    return (
      <div id="herofooter">
        <h2 className="viewport-animation animated bounceIn">{this.state.title}</h2>
        <ReactMarkdown source={this.state.text} className="viewport-animation animated bounceIn" />
        <button aria-label={this.state.ctaLabel} className="btn outline btn-white btn-block viewport-animation animated fadeInUp">{this.state.ctaLabel}</button>
      </div>
    );
  }

}

export { HeroFooter };
export default HeroFooter;
