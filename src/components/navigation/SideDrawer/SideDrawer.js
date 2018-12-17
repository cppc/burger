import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';
import Backdrop from "./Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Closed];
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div onClick={props.closed} className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems authenticated={props.authenticated}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;