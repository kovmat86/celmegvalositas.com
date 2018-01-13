import React from 'react';
import classNames from 'classnames';

class Szechenyi2020Logo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const _className = classNames('', this.props.className);
    return (
      <div className={_className} id="szlogo-container">
        <div id="szlogo-background" />
        <img id="szlogo" src="/resources/images/szlogo.png" alt="Szechenyi 2020 Logo" />
        <img id="szlogoblokk" src="/resources/images/infoblokk.png" alt="Szechenyi 2020 Logo" />
      </div>
    );
  }
}

export { Szechenyi2020Logo };
export default Szechenyi2020Logo;