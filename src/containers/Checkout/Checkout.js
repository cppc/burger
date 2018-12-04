import React, {Component} from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

const checkout = (props) => {
        return (
            <div>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    cancelled={() => {
                        props.history.goBack();
                    }}
                    continue={() => {
                        props.history.replace('/checkout/contact-data')
                    }} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}/>)} />
            </div>
        );
 }

 const mapStateToProps = (state, props) => {
    return ({
        ingredients: state.burger.ingredients
    })
 };

export default connect(mapStateToProps)(checkout);