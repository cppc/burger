import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions';
import {connect} from "react-redux";

class App extends Component {

    componentDidMount() {
        this.props.checkAuthState();
    }

    render() {
        const routes = this.props.authenticated
            ? (
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                </Switch>
            ) : (
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/" />
                </Switch>
            );
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch(actions.checkAuthState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( App));
