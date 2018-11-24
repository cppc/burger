import React, {Component} from 'react';
import Aux from "../../hoc/Aux";

import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

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
        ordering: false
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
        console.log("Purchased");
        this.setState({ordering: false});
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.purchaseCancelledHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancel={this.purchaseCancelledHandler}
                        continue={this.purchase}
                    />
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

export default BurgerBuider;