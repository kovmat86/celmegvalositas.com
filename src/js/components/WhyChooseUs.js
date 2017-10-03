import React from 'react';
import classNames from 'classnames';

class WhyChooseUs extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('whyChooseUs') || {};
  }

  render() {
    const _className = classNames('why-choose-us', this.props.className);

    return (
      <div className={_className} id="whychooseus">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div id="why-choose-us-content-container">
              <h2 className="animated fadeInDown">{this.state.title}</h2>
              <p className="lead animated fadeInDown">{this.state.text}</p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div id="why-choose-us-items-container" className="container animated fadeIn">
              <ul>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderItems() {
    if (!this.state.items) return null;
    return this.state.items.map((v, idx) => (
      <li key={idx}>
        <h4>v.title</h4>
        <p>v.text</p>
      </li>
    ));
  }

}

export { WhyChooseUs };
export default WhyChooseUs;
