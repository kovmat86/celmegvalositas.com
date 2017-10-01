import React from 'react';

class WhoWeAre extends React.Component {

  static propTypes = {
    contentProvider: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      content: this.props.contentProvider.get('whoweare')
    });
  }

  render() {
    return (
      <div className="who-we-are-container">
        <h2>{this.state.content.title}</h2>
        <p>{this.state.content.text}</p>
      </div>
    );
  }

}

export { WhoWeAre };
export default WhoWeAre;