import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getPosts = () => async dispatch => {
   
    try {

        let url = 'api/posts';
        const res = await axios.get(url);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

    } catch(err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

export const addLike = postId => async dispatch => {

    try {

        let url = `api/posts/like/${postId}`;
        const res = await axios.put(url);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });

    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }

}

export const deleteLike = postId => async dispatch => {

    try {

        let url = `api/posts/unlike/${postId}`;
        const res = await axios.put(url);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });


    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }

}

export const deletePost = postId => async dispatch => {

    try {

        let url = `api/posts/post/${postId}`;
        await axios.delete(url);

        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(setAlert('Post Removed', 'success'));

    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }

}

export const addPost = formData => async dispatch => {

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    try {

        let url = `api/posts`;
        const res = await axios.post(url, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));

    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }

}

export const getPost = postId => async dispatch => {
   
    try {

        let url = `../api/posts/post/${postId}`;
        const res = await axios.get(url);

        dispatch({
            type: GET_POST,
            payload: res.data
        });

    } catch(err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    try {

        let url = `../api/posts/comments/${postId}`;
        const res = await axios.put(url, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));

    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }

}


export const deleteComment = (postId, commentId) => async dispatch => {

    try {

        let url = `../api/posts/rmcomments/${postId}/${commentId}`;
        await axios.delete(url);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));

    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }

}