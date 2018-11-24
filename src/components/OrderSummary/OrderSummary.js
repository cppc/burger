import React from 'react';
import Aux from "../../hoc/Aux";
import Button from "../ui/Button/Button";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}</li>
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancel} btnType="Danger">CANCEL</Button>
            <Button clicked={props.continue} btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;