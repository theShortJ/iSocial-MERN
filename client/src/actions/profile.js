import axios from 'axios';
import {setAlert} from './alerts';
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_REPOS } from '../actions/constants';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

export const getAllProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    try {
        const res = await axios.get('/api/profile/');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

export const getProfileById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${id}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

export const getGitHubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

export const createProfile = (formData, history, edit) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch( setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success') );

        if (!edit) {
            history.push('/dashboard');
        }

    } catch (error) {
        const errors = error.response.date.error;
        if ( errors ) {
            errors.forEach(element => {
                dispatch( setAlert( element.msg, 'danger') );
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch( setAlert('Experience Added', 'success') );

        if (res.data) {
            history.push('/dashboard');
        }

    } catch (error) {
        const errors = error.response.date.error;
        if ( errors ) {
            errors.forEach(element => {
                dispatch( setAlert( element.msg, 'danger') );
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch( setAlert('Education Added', 'success') );

        if (res.data) {
            history.push('/dashboard');
        }

    } catch (error) {
        const errors = error.response.date.error;
        if ( errors ) {
            errors.forEach(element => {
                dispatch( setAlert( element.msg, 'danger') );
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Deletes the experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = axios.delete(`/api/profile/experience/${id}`);

        if (res.data) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            dispatch( setAlert('Experience Deletd', 'success') );
        }
    } catch (error) {
        const errors = error.response.date.error;
        if ( errors ) {
            errors.forEach(element => {
                dispatch( setAlert( element.msg, 'danger') );
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Deletes the education
export const deleteEducation = id => async dispatch => {
    try {
        const res = axios.delete(`/api/profile/education/${id}`);

        if (res.data) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            dispatch( setAlert('Education Deletd', 'success') );
        }
    } catch (error) {
        const errors = error.response.date.error;
        if ( errors ) {
            errors.forEach(element => {
                dispatch( setAlert( element.msg, 'danger') );
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Deletes the account & profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure?')) {
        try {
            const res = axios.delete('/api/profile/');

            if (res.data) {
                dispatch({type: CLEAR_PROFILE});
                dispatch({type: ACCOUNT_DELETED});
                dispatch( setAlert('Account permanently deletd.', 'success') );
            }
        } catch (error) {
            const errors = error.response.date.error;
            if ( errors ) {
                errors.forEach(element => {
                    dispatch( setAlert( element.msg, 'danger') );
                });
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            });
        }
    }
};