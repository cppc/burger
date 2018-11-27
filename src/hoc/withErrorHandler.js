import React, {Component} from 'react';

import Modal from '../components/ui/Modal/Modal';
import Aux from './Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        errorClickedHandler = () => {
            this.setState({error: null})
        };

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorClickedHandler}>
                        {this.state.error ? this.state.error.message : 'Unknown error'}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    };
};

export default withErrorHandler;