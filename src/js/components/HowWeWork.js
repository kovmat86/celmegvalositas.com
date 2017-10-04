import React from 'react';
import classNames from 'classnames';
import { Icon } from 'react-fa';

class HowWeWork extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('howWeWork') || {};
  }

  render() {
    const _className = classNames('how-we-work', this.props.className);
    return (
      <div className={_className} id="howwework">
        <div className="row">
          <div className="col">
            <h2 className="gold-gradient-color viewport-animation animated fadeInUp">{this.state.title}</h2>
          </div>
        </div>
        <div className="row">
          {this.renderHowWeWorkItem(this.state.items)}
        </div>
      </div>
    );
  }

  renderHowWeWorkItem(items) {
    if (!items) return null;
    return items.map((item, idx) => {
      let button; 
      if (item.ctaLabel) {
        button = <button aria-label="text" className="btn outline btn-gold btn-block">{item.ctaLabel}</button>;
      }
      return (
        <div key={idx} className="col-xs-12 col-md-4 viewport-animation animated fadeInUp delay-250">
          <div className="how-we-work-item">
            <span className="order-label">{(idx + 1)}</span>
            <Icon name={item.faIconName} className="how-we-work-item-icon" />
            <h3>{item.title}</h3>
            <p className="price">{item.Price}</p>
            {this.renderHowWeWorkItemList(item.items)}
            {button}
          </div>
        </div>
      );
    });
  }

  renderHowWeWorkItemList(list) {
    if (!list) return null;
    const liElms = list.map((item, idx) => (
      <li key={idx}><Icon name="check" className="green-color" /><span>{item}</span></li>
    ));
    return (
      <ul>
        {liElms}
      </ul>
    );
  }

}

export { HowWeWork };
export default HowWeWork;