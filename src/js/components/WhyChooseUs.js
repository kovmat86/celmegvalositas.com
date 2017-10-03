import React from 'react';
import classNames from 'classnames';
import { Icon } from 'react-fa';

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
              <h2 className="animated fadeInDown viewport-animation animated fadeInLeft">{this.state.title}</h2>
              <p className="animated fadeInDown viewport-animation animated fadeInLeft delay-100">{this.state.text}</p>
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
      <li key={idx} className="viewport-animation animated fadeInUp delay-{(idx+1) * 250}">
        <Icon name="user" className="why-choose-us-icon" />
        <span>{v.title}</span>
      </li>
    ));
  }

}

export { WhyChooseUs };
export default WhyChooseUs;
