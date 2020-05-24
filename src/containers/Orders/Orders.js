import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";

import axios from '../../axios-orders';
import Spinner from "../../components/ui/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler';

import { fetchOrders } from '../../store/actions';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        return (
            this.props.loading
                ? (<Spinner/>)
                : (
                    <div>
                        {this.props.orders.map(order => (
                            <Order
                                key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}/>
                        ))}
                    </div>
                )
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));