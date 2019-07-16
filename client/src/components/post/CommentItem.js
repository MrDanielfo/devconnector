import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import Moment from 'react-moment';

const CommentItem = 
({
    postId, 
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment
}) => {
    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt={name}
                    />
                    <h4>{name}</h4>
                </Link>

                <div>
                    <p className="my-1">{text}</p>

                    <p className="post-date">
                        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                    </p>

                    {
                        !auth.loading && user === auth.user._id
                            ?
                            <button onClick={e => deleteComment(postId, _id)} type="button" className="btn btn-danger">
                                <i className="fas fa-times" />
                            </button>
                            :
                            ''
                    }
                </div>    
            </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
