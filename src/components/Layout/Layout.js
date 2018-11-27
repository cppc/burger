import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from "../navigation/Toolbar/Toolbar";
import SideDrawer from '../navigation/SideDrawer/SideDrawer';

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
        return (
            <Aux>
                <Toolbar toggleMenu={this.toggleDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;