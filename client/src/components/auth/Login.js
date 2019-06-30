import React, {Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { loginUser } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({setAlert, loginUser, isAuthenticated }) => {

    const initialState = {
      email: '',
      password: ''
    };

    const [formData, setFormData] = useState(initialState);

    const { email, password } = formData;

    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const sendData = async e => {
        e.preventDefault();
     
        if (email.length === 0 || password.length === 0) {
          setAlert('You must provide your credentials', 'danger');
        } else {
          loginUser({ email, password });
        }
     
    };

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }


    return (
      <Fragment>
        <section className="container">
          
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user" /> Sign into Your Account
          </p>
          <form className="form" onSubmit={sendData}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary"
              value="Login"
            />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/login">Sign Up</Link>
          </p>
        </section>
      </Fragment>
    );
}

Login.propTypes = {
  setAlert : PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})
 

export default connect(mapStateToProps, { setAlert, loginUser })(Login);

