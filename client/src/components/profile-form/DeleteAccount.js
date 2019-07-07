import React from 'react'
import PropTypes from 'prop-types'

const DeleteAccount = ({ deleteAccount }) => {
    return (
      <div className="my-2">
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus" /> Delete My Accout
        </button>
      </div>
    );
}

DeleteAccount.propTypes = {
    deleteAccount: PropTypes.func.isRequired
}

export default DeleteAccount
