import React, { Fragment } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems({ navLinks }) {
  return (
    <>
      {navLinks.map((link, idx) => (
        <NavigationItem link={link} key={idx} />
      ))}
    </>
  );
}

export default NavigationItems;
