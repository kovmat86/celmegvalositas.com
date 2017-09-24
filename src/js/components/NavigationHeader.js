import React from 'react';
import { Navbar, NavItem } from 'neal-react';

class NavigationHeader extends React.Component {

  render() {
    const menus = this.props.data.map(item => {
      const props = {
        title: item.title,
        url: item.url
      };
      return (
        <NavItem>
          <a className="nav-link" href={ props.url } target="_blank">{ props.title }</a>
        </NavItem>
      );
    });

    return (
      <Navbar brand={this.props.title}>
        { menus }
      </Navbar>
    );

  }

}

export { NavigationHeader };
export default NavigationHeader;