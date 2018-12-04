import React from 'react';

import classes from './Order.module.css';

const iStyle = {
    textTransform: 'capitalize',
    display: 'inline-block',
    margin: '0 8px',
    border: '1px solid #ccc',
    padding: '5px'
};

const order = (props) => {
    const ingredients = [];
    for (let key in props.ingredients) {
        ingredients.push(<span style={iStyle} key={key}>{key} ({props.ingredients[key]})</span>)
    }
    // console.log(ingredients);
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;