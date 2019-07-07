import React, { Fragment } from 'react'

const Spinner = () => {
    return (
      <Fragment>
        <div className="m-3">
          <i className="fa fa-spinner fa-spin fa-4x" />
          <span>Loading...</span>
        </div>
      </Fragment>
    );
}

export default Spinner
