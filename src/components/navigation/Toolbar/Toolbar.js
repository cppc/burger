import React from 'react';

import classes from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import MenuButton from "../MenuButton/MenuButton";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuButton clicked={props.toggleMenu}>MENU</MenuButton>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems authenticated={props.authenticated}/>
        </nav>
    </header>
);


export default toolbar;