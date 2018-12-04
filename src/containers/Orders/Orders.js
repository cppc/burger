import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";

import axios from '../../axios-orders';
import Spinner from "../../components/ui/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler';

import { fetchOrders } from '../../store/actions';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
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
        loading: state.order.loading
    }
};

export default connect(mapStateToProps, { fetchOrders })(withErrorHandler(Orders, axios));