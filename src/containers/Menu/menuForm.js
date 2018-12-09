import { makeInputElement, makeSelectElement } from '../../util/formUtils';

const required = { required: true };

export default {
    name: makeInputElement('text', 'Item Name (Item)', '', required),
    label: makeInputElement('text', 'Item Label (item)', '', required),
    street: makeInputElement('text', 'Your Street Address', '', required),
    postalCode: makeInputElement('text', 'Your Postal Code', '', required),
    deliveryMethod: makeSelectElement([
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Budget'}
        ]
        , 'fastest')
}