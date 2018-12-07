import {makeForm, makeInputElement, makeSelectElement} from '../../../util/formUtils';

const required = {required: true};

const controls = {
    name: makeInputElement('text', 'Your Name', '', required),
    email: makeInputElement('text', 'Your Email Address', '', required),
    street: makeInputElement('text', 'Your Street Address', '', required),
    postalCode: makeInputElement('text', 'Your Postal Code', '', required),
    deliveryMethod: makeSelectElement([
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Budget'}
        ]
        , 'fastest')
};

const contactForm = (handler) => {
    return makeForm(controls, handler);
};

export default contactForm;