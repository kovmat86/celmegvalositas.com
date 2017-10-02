import React from 'react';

class WhoWeAre extends React.Component {

  static propTypes = {
    contentProvider: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('whoAreWe') || {};
  }

  render() {
    return (
      <div id="whoweare" className="who-we-are-container">
        <h2>{this.state.title}</h2>
        <p>{this.state.text}</p>
      </div>
    );
  }

}

export { WhoWeAre };
export default WhoWeAre;