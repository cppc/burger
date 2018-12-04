import React from 'react';

 import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const navigationItems = () => {
    return (
        <div className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </div>
    );
};

export default navigationItems;