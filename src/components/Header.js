import React from 'react';

class Header extends React.Component {

  render() {
    return (
        <div className="header-container">
          <div className="header">
              <img alt="Scrabble Cheater" src={require('../images/scrabble-logo.png')} />
          </div>
        </div>
    )
  }
}

export default Header;
