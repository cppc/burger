import {makeForm, makeInputElement, makeSelectElement} from '../../../util/formUtils';

const required = {required: true};

const controls = [
    makeInputElement('name', 'text', 'Your Name', '', required),
    makeInputElement('email', 'text', 'Your Email Address', '', required),
    makeInputElement('street', 'text', 'Your Street Address', '', required),
    makeInputElement('postalCode', 'text', 'Your Postal Code', '', required),
    makeSelectElement('deliveryMethod',[
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Budget'}
        ]
        , 'fastest')
];

const contactForm = (handler) => {
    return makeForm(controls, handler);
};

export default contactForm;