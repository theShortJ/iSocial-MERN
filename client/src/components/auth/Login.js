import React, {Fragment, useState} from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ( { login, isAuthenticated } ) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {email, password} = formData;

    const onchange = event => setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });

    const onSubmit = async event => {
        event.preventDefault();
        console.log('Successfully Logged In!');
        login({email, password});
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return  (
        <Fragment>
            <h1 className="large text-primary">Log In</h1>
            <p className="lead"><i className="fas fa-user"></i> Log Into Your Account</p>
            <form className="form" onSubmit = {event => onSubmit(event)}>
                <div className="form-group">
                    <input type="email"
                        placeholder="Email Address" 
                        name="email"
                        value={email}
                        onChange={ event => onchange(event)} />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    minLength="6"
                    onChange={ event => onchange(event)} 
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account?<Link to="/register"> Sign Up</Link>
            </p>
        </Fragment>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(withRouter(Login));
