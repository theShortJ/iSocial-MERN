import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alerts';
import PropTypes from 'prop-types';

//import axios from 'axios';

// const Register = (props) => {
const Register = ({ setAlert }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const {name, email, password, password2} = formData;

    const onchange = event => setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });

    const onSubmit = async event => {
        event.preventDefault();
        if (password !== password2) {
            setAlert('React-Redux: Password do not match!', 'danger');
            console.log('Password do not match!');
            //props.setAlert('React-Redux: Password do not match!', 'danger');
        } else {
            console.log('Successfully created!');
            setAlert('React-Redux: Successfully created!', 'success');
            //props.setAlert('React-Redux: Successfully created!', 'success');

            // const newUser = {
            //     name, email, password
            // }

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         }
            //     };

            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users', body, config);

            //     console.log(res.data);

            // } catch (error) {
            //     console.log(error.response.data);
            // }
        }
    };

    return  (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit = {event => onSubmit(event)}>
                <div className="form-group">
                    <input type="text" 
                        placeholder="Name" 
                        name="name"
                        value={name} 
                        onChange={ event => onchange(event)} 
                        required />
                </div>
                <div className="form-group">
                    <input type="email"
                        placeholder="Email Address" 
                        name="email"
                        value={email}
                        onChange={ event => onchange(event)} />
                    <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
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
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    minLength="6"
                    onChange={ event => onchange(event)} 
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account?<Link to="/login"> Sign In</Link>
            </p>
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
};

export default connect(null, {setAlert})(Register);
