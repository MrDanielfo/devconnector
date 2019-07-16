import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Content = ({ post: {avatar, name, text, date } }) => {
    return (
      <div className="post bg-white p-1 my-1">
        <div>
            <img className="round-img" src={avatar} alt={name} />
            <h4>{name}</h4>
        </div>

        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
        </div>

      </div>
    );
}

Content.propTypes = {
    post : PropTypes.object.isRequired
}

export default Content;
