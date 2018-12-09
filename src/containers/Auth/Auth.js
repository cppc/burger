import React, {Component} from 'react';
import {renderFormControls, updateForm} from "../../util/formUtils";
import {connect} from "react-redux";

import classes from './Auth.module.css';
import authForm from './authForm';
import * as actions from '../../store/actions';
import {signUp, login} from '../../axios-auth';

import Spinner from "../../components/ui/Spinner/Spinner";
import Button from "../../components/ui/Button/Button";
import withErrorHandler from "../../hoc/withErrorHandler";
import {Redirect} from "react-router-dom";

class Auth extends Component {

    onChangeHandler = (event, id) => {
        console.log("Auth - onChange: " + id);
        this.setState({authForm: updateForm(this.state.authForm, id, event.target.value)});
    };

    state = {
        authForm: authForm(this.onChangeHandler.bind(this)),
        signUp: true
    };

    switchSignupHandler = () => {
        console.log(this.state);
        this.setState(prevState => {
            return { signUp: !prevState.signUp }
        })
    };

    loginHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.onAuth(
            this.state.authForm.controls.email.value,
            this.state.authForm.controls.password.value,
            this.state.signUp
        )
    };

    errorMap = {
        EMAIL_EXISTS: 'That email address is already registered',
        OPERATION_NOT_ALLOWED: 'BurgerBuilder is not registering new customers at this time',
        TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many unsuccessful attempts. Try again later',
        EMAIL_NOT_FOUND: 'No account is currently registered with that email address',
        INVALID_PASSWORD: 'Invalid password',
        USER_DISABLED: 'The account registered with that email address has been disabled'
    };

    render() {
        if (this.props.authenticated) {
            return <Redirect to={this.props.redirectPath}/>
        }

        const label = this.state.signUp ? "REGISTER" : "LOG IN";
        const switchLabel = this.state.signUp ? "LOG IN" : "REGISTER";

        const errorMessage = this.props.error ? (
            <p>{this.errorMap[this.props.error.message]}</p>
        ) : null;

        return this.props.loading ? (
            <div className={classes.Auth}>
                <Spinner/>
            </div>)
            : (
                <div className={classes.Auth}>
                    {errorMessage}
                    <h4>Sign in or sign up</h4>
                    <form onSubmit={this.loginHandler}>
                        {renderFormControls(this.state.authForm)}
                        <Button btnType="Success" disabled={!this.state.authForm.valid}>{label}</Button>
                    </form>
                    <Button btnType="Danger" clicked={this.switchSignupHandler}>SWITCH TO {switchLabel}</Button>
                </div>
            );
    }
}

const mapStateToProps = (state, props) => {
    return {
        loading: state.auth.authenticating,
        error: state.auth.error,
        authenticated: state.auth.authenticated,
        redirectPath: state.auth.redirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, register) => dispatch(actions.auth(email, password, register))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);