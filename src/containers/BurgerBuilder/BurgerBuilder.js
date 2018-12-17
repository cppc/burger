import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addIngredient, removeIngredient, setAuthRedirectPath} from "../../store/actions/index";

import Aux from "../../hoc/Aux";

import withErrorHandler from '../../hoc/withErrorHandler';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/ui/Spinner/Spinner";

export class BurgerBuilder extends Component {

    state = {
        ordering: false,
        loading: false
    };

    purchaseHandler() {
        if (this.props.authenticated) {
            this.setState({ordering: true})
        } else {
            this.props.setAuthRedirectPath(this.props.readyToOrder ? '/checkout' : '/');
            this.props.history.push('/auth')
        }
    }

    purchaseCancelledHandler = () => {
        this.setState({ordering: false});
    };

    purchase = () => {
        this.props.history.push({
            pathname: '/checkout'
        })
    };

    render() {
        console.log(this.props);
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.purchaseCancelledHandler}>
                    {!this.state.loading
                        ? (<OrderSummary
                            ingredients={this.props.ingredients}
                            price={this.props.totalPrice}
                            cancel={this.purchaseCancelledHandler}
                            continue={this.purchase}/>)
                        : <Spinner/>}
                </Modal>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    authenticated={this.props.authenticated}
                    ingredientAdded={this.props.addIngredient}
                    ingredientRemoved={this.props.removeIngredient}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    ready={this.props.readyToOrder}
                    order={this.purchaseHandler.bind(this)}
                />
            </Aux>
        );
    }
}

const mapStateToProps = ({burger, checkout, auth}, ownProps) => {
    console.log(burger, checkout);
    const {ingredients, readyToOrder} = burger;
    const {totalPrice} = checkout;
    return ({
        ingredients: ingredients,
        readyToOrder: readyToOrder,
        totalPrice: totalPrice,
        authenticated: auth.authenticated
    })
};

export default connect(mapStateToProps, {addIngredient, removeIngredient, setAuthRedirectPath})(withErrorHandler(BurgerBuilder, axios));