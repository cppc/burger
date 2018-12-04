import React from 'react';
import Input from "../components/ui/Input/Input";

export const makeInputElement = (t, p, v, x) => {
    return {
        elementType: 'input',
        elementConfig: {
            type: t,
            placeholder: p
        },
        value: v,
        validation: x,
        valid: false,
        touched: false
    }
};

export const makeSelectElement = (o, v, x) => {
    return {
        elementType: 'select',
        elementConfig: {
            options: o,
        },
        value: v,
        validation: x,
        valid: false,
        touched: false
    }
};

export const makeForm = (form, handler) => {
    console.log(form);
    const formElements = [];
    for (let key in form) {
        const { elementType, elementConfig, value, valid, validation, touched } = form[key];
        const isInvalid = !(valid || !validation);
        formElements.push(
            <Input
                elementType={elementType}
                elementConfig={elementConfig}
                value={value}
                key={key}
                invalid={isInvalid}
                changed={event => handler(event, key)}
                touched={touched}
            />
        )
    }
    return formElements;
};

export default {
    makeForm: makeForm,
    makeSelectElement: makeSelectElement,
    makeInputElement: makeInputElement
}

