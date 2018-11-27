import React, {Component} from 'react';
import Aux from "../../hoc/Aux";

import withErrorHandler from '../../hoc/withErrorHandler';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/ui/Spinner/Spinner";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.1,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        readyToOrder: false,
        ordering: false,
        loading: false
    };

    updateIngredient = (type, adjustment) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + adjustment;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const sum = Object.keys(updatedIngredients).map((key) => updatedIngredients[key]).reduce((cnt, cur) => cnt + cur, 0);
        const charge = INGREDIENT_PRICES[type] * adjustment;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + charge,
            readyToOrder: sum > 0
        })
    };

    addIngredientHandler = (type) => {
        this.updateIngredient(type, 1);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            this.updateIngredient(type, -1);
        }
    };

    purchaseHandler () {
        this.setState({ordering: true})
    }

    purchaseCancelledHandler = () => {
        this.setState({ordering: false});
    };

    purchase = () => {
        // console.log("Purchased");
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chris',
                address: {
                    street: 'Test Street',
                    postalCode: '06711',
                    country: 'USA'
                },
                email: 'foo@bar.gag',
                deliveryMethod: 'fastest'
            }
        };
        axios.post('/orders', order)
            .then(response => {
                console.log(response);
                this.setState({ordering: false, loading: false});
            })
            .catch((error => {
                console.log(error);
                this.setState({ordering: false, loading: false});
            }))
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let modalContent = (
            <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                cancel={this.purchaseCancelledHandler}
                continue={this.purchase}
            />
        );
        if (this.state.loading) {
            modalContent = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.purchaseCancelledHandler}>
                    {modalContent}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ready={this.state.readyToOrder}
                    order={this.purchaseHandler.bind(this)}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);