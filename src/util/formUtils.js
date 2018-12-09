import React from 'react';
import Input from "../components/ui/Input/Input";

export const checkValidity = (value, rules) => {

    if (!rules) return true;

    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = (value.length >= rules.minLength) && isValid
    }

    if (rules.maxLength) {
        isValid = (value.length <= rules.maxLength) && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.pattern) {
        isValid = rules.pattern.test(value) && isValid
    }

    return isValid;
};

export const formValid = (form, changed) => {
    for (let inp in form.controls) {
        if (changed !== inp && form.controls[inp].validation && !form.controls[inp].valid) {
            return false;
        }
    }
    return true;
};

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

export const updateForm = (form, id, value) => {
    const controls = form.controls;
    const element = controls[id];
    const valid = checkValidity(value, element.validation);
    const newForm = {
        ...form,
        controls: {
            ...controls,
            [id]: {
                ...element,
                value: value,
                valid: valid,
                touched: true
            }
        },
        valid: valid && formValid(form, id)
    };
    return newForm;
};

export const makeForm = (controls, handler) => {
    return {
        controls: controls,
        valid: false,
        handler: handler
    }
};

export const renderFormControls = (form) => {
    console.log(form);
    const formElements = [];
    const handler = form.handler;
    for (let key in form.controls) {
        const { elementType, elementConfig, value, valid, validation, touched } = form.controls[key];
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
    makeInputElement: makeInputElement,
    formValid: formValid,
    checkValidity: checkValidity,
    renderFormControls: renderFormControls
}

