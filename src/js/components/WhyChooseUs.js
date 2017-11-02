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
        <div id="why-choose-us-content-container">
          <h2 className="animated fadeInDown viewport-animation animated fadeInLeft">{this.state.title}</h2>
          <p className="animated fadeInDown viewport-animation animated fadeInLeft delay-100">{this.state.text}</p>
        </div>
        <div id="why-choose-us-items-container" className="row animated fadeIn">
          {this.renderItems()}
          {this.renderLastItem()}
        </div>
      </div>
    );
  }

  renderItems() {
    if (!this.state.items) return null;
    const itemCount = this.state.items.length;
    return this.state.items
      .filter((v, idx) => idx < itemCount - 1)
      .map((v, idx) => {
        const delay = (idx+1) * 250;
        return <div key={idx} className={`col-xs-12 col-md-4 viewport-animation animated fadeInUp delay-${delay}`}>
          <div className="why-choose-us-item-container">
            <Icon name={v.icon} className="why-choose-us-icon" />
            <ul>{this.renderWhyElements(v.listItem)}</ul>
          </div>
        </div>
      });
  }

  renderLastItem() {
    const itemIdx = this.state.items.length - 1;
    const item = this.state.items[itemIdx];
    return (
      <div className="container viewport-animation animated fadeInUp">
        <p>{item.title}</p>
        <div className="col-xs-12 col-md-12">
          <div className="why-choose-us-item-container last">
            <Icon name={item.icon} className="why-choose-us-icon" />
            <ul>{this.renderWhyElements(item.listItem)}</ul>
          </div>
        </div>
      </div>
    );
  }

  renderWhyElements(elm) {
    if (!elm || !elm.length) return null;
    return elm.map((v, idx) => (
      <li key={idx}>{v}</li>
    ));
  }

}

export { WhyChooseUs };
export default WhyChooseUs;
