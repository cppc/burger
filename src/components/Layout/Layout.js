import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from "../navigation/Toolbar/Toolbar";
import SideDrawer from '../navigation/SideDrawer/SideDrawer';
import {connect} from "react-redux";

class Layout extends Component {

    state = {
        showSideDrawer: true
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    toggleDrawerOpenHandler = () => {
        this.setState(prevState => { return { showSideDrawer: !prevState.showSideDrawer } });
    };

    render() {
        console.log(this.props);
        return (
            <Aux>
                <Toolbar
                    authenticated={this.props.authenticated}
                    toggleMenu={this.toggleDrawerOpenHandler}/>
                <SideDrawer
                    authenticated={this.props.authenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps)(Layout);