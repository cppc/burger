import React from 'react';

 import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <div className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.authenticated
                ? <NavigationItem link="/orders">Orders</NavigationItem>
                : null}
            {!props.authenticated
                ? <NavigationItem link="/auth">Auth</NavigationItem>
                : <NavigationItem link="/logout">Log out</NavigationItem>}
        </div>
    );
};

export default navigationItems;