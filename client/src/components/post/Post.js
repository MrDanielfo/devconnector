import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost  } from '../../actions/post';
import Content from './Content';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading}, match }) => {

    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match])
    
    return post === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <div className="container">
         <Link to="/posts" className="btn">
            Back to posts
         </Link>
          <Content post={post} />
          <CommentForm postId={post._id} />

          <div className="comments">

            {post.comments.map(comment => (
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
          
          </div>

        </div>
      </Fragment>
    );
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
