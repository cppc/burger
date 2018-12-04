import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
        console.log("Invalid value: " + inputClasses);
    }

    const elementProps = {
        ...props.elementConfig,
        className: inputClasses.join(' '),
        value: props.value,
        onChange: props.changed
    };

    console.log(elementProps);

    switch (props.elementType) {
        case ('input'):
            inputElement = <input {...elementProps}/>;
            break;
        case ('textarea'):
            inputElement = <textarea {...elementProps}/>;
            break;
        case ('select'):
            inputElement = (
                <select {...elementProps}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                        )
                    )}
                </select>);
            break;
        default:
            inputElement = <input {...elementProps}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;