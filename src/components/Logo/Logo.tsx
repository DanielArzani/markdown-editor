import React from 'react';

import logo from '../../assets/logo.svg';

/**
 * Project Logo
 */
function Logo() {
  return (
    <h1>
      <img src={logo} alt='MARKDOWN' />
      <span className='sr-only'>MARKDOWN</span>
    </h1>
  );
}

export default Logo;
