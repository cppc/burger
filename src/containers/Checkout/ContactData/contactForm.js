import { makeInputElement, makeSelectElement } from '../../../util/formUtils';

const val = { required: true };

export default {
    name: makeInputElement('text', 'Your Name', '', val),
    email: makeInputElement('text', 'Your Email Address', '', val),
    street: makeInputElement('text', 'Your Street Address', '', val),
    postalCode: makeInputElement('text', 'Your Postal Code', '', val),
    deliveryMethod: makeSelectElement([
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Budget'}
        ]
        , 'fastest')
}