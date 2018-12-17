import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from "../../../components/ui/Button/Button";

import {renderFormControls, updateForm} from '../../../util/formUtils';

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

    onChangeHandler = (event, id) => {
        console.log("onChange: " + id);
        this.setState({orderForm: updateForm(this.state.orderForm, id, event.target.value)});
    };

    state = {
        orderForm: inputForm(this.onChangeHandler.bind(this))
    };

    formData = () => {
        const data = {};
        for (let key in this.state.orderForm.controls) {
            data[key] = this.state.orderForm.controls[key].value
        }
        return data;
    };

    orderHandler = (e) => {
        e.preventDefault();
        console.log(this.props.ingredients);

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            userId: this.props.userId,
            orderData: this.formData()
        };
        this.props.postOrder(order);
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
                        {renderFormControls(this.state.orderForm)}
                        <Button btnType="Success" disabled={!this.state.orderForm.valid}>ORDER</Button>
                    </form>
                </div>
            );
    }
}

const mapStateToProps = (state, props) => {
    return ({
        ingredients: state.burger.ingredients,
        price: state.checkout.totalPrice,
        loading: state.order.saving,
        userId: state.auth.userId
    })
};

export default connect(mapStateToProps, {postOrder})(ContactData);