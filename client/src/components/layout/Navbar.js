import React, { Fragment } from 'react';
import { Link }  from 'react-router-dom';
// Redux

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({logoutUser, auth: {isAuthenticated, loading } }) => {

  const authLinks = (
    <ul>
      <Link onClick={logoutUser} to="/login">
        <i className="fas fa-sign-out-alt" />
        <span className="hide-sm">Logout</span>
      </Link>
    </ul>
  );


  const guestLinks = (
      <ul>
          <li>
            <a href="#!">Developers</a>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
      </ul>
  );


    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to='/'>
            <i className="fas fa-code" /> DevConnector
          </Link>
        </h1>

        { !loading && 
          (<Fragment>
            { isAuthenticated  ? authLinks : guestLinks }
          </Fragment>)
        
        }
        
      </nav>
    );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth : state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
