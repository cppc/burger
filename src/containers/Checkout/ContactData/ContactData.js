import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from "../../../components/ui/Button/Button";

import {makeForm} from '../../../util/formUtils';

import Spinner from "../../../components/ui/Spinner/Spinner";

import classes from './ContactData.module.css';
import inputForm from './contactForm';
import {postOrder} from '../../../store/actions/orderActions';

class ContactData extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.loading && !this.props.loading) {
            this.props.history.push('/');
        }
    }

    state = {
        orderForm: inputForm,
//        loading: false,
        valid: false
    };

    formData = () => {
        const data = {};
        for (let key in this.state.orderForm) {
            data[key] = this.state.orderForm[key].value
        }
        return data;
    };

    orderHandler = (e) => {
        e.preventDefault();
        console.log(this.props.ingredients);

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: this.formData()
        };
        this.props.postOrder(order);
    };

    checkValidity(value, rules) {

        if (!rules) return true;

        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = (value.length >= rules.minLength)
        }

        return isValid;
    }

    formValid(form, changed) {
        for (let inp in form) {
            if (changed !== inp && form[inp].validation && !form[inp].valid) {
                return false;
            }
        }
        return true;
    }

    onChangeHandler = (event, id) => {
        console.log("onChange: " + id);
        const valid = this.checkValidity(event.target.value, this.state.orderForm[id].validation);
        console.log(valid);
        const form = {
            ...this.state.orderForm,
            [id]: {
                ...this.state.orderForm[id],
                value: event.target.value,
                valid: valid,
                touched: true
            }
        };
        const allValid = valid && this.formValid(this.state.orderForm, id);
        console.log(allValid);
        console.log(form);
        this.setState({orderForm: form, valid: allValid});
    };

    render() {
        console.log(this.state);
        return this.props.loading ? (
                <div className={classes.ContactData}>
                    <Spinner/> :
                </div>) :
            (
                <div className={classes.ContactData}>
                    <h4>Enter your contact information</h4>
                    <form onSubmit={this.orderHandler}>
                        {makeForm(this.state.orderForm, this.onChangeHandler)}
                        <Button btnType="Success" disabled={!this.state.valid}>ORDER</Button>
                    </form>
                </div>
            );
    }
}

const mapStateToProps = (state, props) => {
    return ({
        ingredients: state.burger.ingredients,
        price: state.checkout.totalPrice,
        loading: state.order.saving
    })
};

export default connect(mapStateToProps, {postOrder})(ContactData);