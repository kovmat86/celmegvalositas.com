import React from 'react';

class NavigationHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('navigation') || {};
  }

  renderMenuItems() {
    let menus = null;
    if (this.state.items) {
      menus = this.state.items.map((item, i) => {
        return <li role="presentation" key={i}><a href={item.url}>{item.label}</a></li>
      });
    }
    return menus;
  }

  render() {
    return (
      <ul className="nav nav-pills menu-center margin-top-30 scroll-nav scroll-down">
        <li role="presentation" key={999}><a href="#home"><i className="fa fa-home" />{this.props.title}</a></li>
        {this.renderMenuItems()}
      </ul>
    );

  }

}

export { NavigationHeader };
export default NavigationHeader;