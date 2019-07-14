import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from './types';
import axios from 'axios';
import { setAlert } from './alert';


export const getCurrentProfile = () => async dispatch => {
    try {
        let url = 'api/profile/me';

        const res = await axios.get(url);

        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
        
    } catch (err) {

        dispatch({
          type: PROFILE_ERROR,
          payload: {msg: err.response.statusText, status: err.response.status }
        });
        
    }
}

// Get All Profiles

export const getProfiles = () => async dispatch => {

  dispatch({ type: CLEAR_PROFILE });

  try {
    let url = 'api/profile';

    const res = await axios.get(url);

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });

  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Get Profile By Id

export const getProfileById = userId => async dispatch => {

  try {
    // ver por qué sucede esto
    let url = `../api/profile/user/${userId}`;

    const res = await axios.get(url);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

// Get Github Repos

export const getGithubRepos = username => async dispatch => {

  try {
    let url = `../api/profile/github/${username}`;

    const res = await axios.get(url);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });

  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {

  try{

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let url = 'api/profile';

    const res = await axios.post(url, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', edit ? 'primary' : 'success' ));

    if(!edit) {
        history.push('/dashboard');
    }

  } catch(err) {

    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }

}

export const addExperience = (formData, history) => async dispatch => {

  try {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let url = 'api/profile/experience';

    const res = await axios.put(url, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
   

  } catch (err) {

    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }

}

export const addEducation = (formData, history) => async dispatch => {

  try {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let url = 'api/profile/education';

    const res = await axios.put(url, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');


  } catch (err) {

    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }

}

// delete experience 

export const deleteExperience = id => async dispatch => {

  try {

    let url = `api/profile/experience/${id}`;

    const res = await axios.delete(url);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience removed', 'success'));

  } catch(err) {

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }

}

// delete experience

export const deleteEducation = id => async dispatch => {

  try {

    let url = `api/profile/education/${id}`;

    const res = await axios.delete(url);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education removed', 'success'));

  } catch(err) {

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }

}

// DELETE ACCOUNT


export const deleteAccount = () => async dispatch => {

  if(window.confirm('Are you sure? This can NOT be undone!')) {

      try {

        let url = `api/profile`;

        await axios.delete(url);

        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });

        dispatch(setAlert('Your account has been permanantly deleted', 'danger'));

      } catch (err) {

        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status
          }
        });
        
      }

  }

}


