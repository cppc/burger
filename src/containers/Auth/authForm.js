import { makeForm, makeInputElement } from "../../util/formUtils";

const controls = {
    email: makeInputElement('email', 'Email address', '', { required: true, isEmail: true }),
    password: makeInputElement('password', 'Password', '', { required: true, minLength: 6 })
};

const authForm = (handler) => {
    return makeForm(controls, handler);
};

export default authForm;