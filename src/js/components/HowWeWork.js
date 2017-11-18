import React from 'react';
import classNames from 'classnames';
import { Icon } from 'react-fa';
import { showModal } from '../helpers/popups';

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
        const onClick = item.ctaCode ? showModal(item.ctaCode) : (() => {});
        button = <button 
          aria-label="text" 
          className="btn outline btn-gold btn-block" 
          onClick={onClick}>{item.ctaLabel}</button>;
      }
      const delay = `delay-${(idx + 1) * 250}`;
      
      return (
        <div key={idx} className={classNames('col-xs-12 col-md-6 viewport-animation animated fadeIn', delay)}>
          <div className="how-we-work-item">
            <span className="order-label">{(idx + 1)}</span>
            <Icon name={item.faIconName} className="how-we-work-item-icon" />
            <h3>{item.title}</h3>
            <p className="price">{item.Price}</p>
            <p className="length">{item.length}</p>
            <p>{item.text}</p>
            <h5>{item.whatHappensTitle}</h5>
            <p>{item.activityDescription}</p>
            {button}
          </div>
        </div>
      );
    });
  }

}

export { HowWeWork };
export default HowWeWork;