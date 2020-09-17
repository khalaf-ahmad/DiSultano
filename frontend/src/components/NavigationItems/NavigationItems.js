import React, { Fragment } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({ navLinks }) => {
    return (
        <Fragment>
            {navLinks.map((link, idx) =>  <NavigationItem link={link} key={idx} />)}
        </Fragment>
    );
};

export default NavigationItems;
