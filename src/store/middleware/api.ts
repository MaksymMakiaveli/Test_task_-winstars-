import { Middleware, Dispatch } from 'redux';
import { SUCCESS, FAIL, API } from '../types/actionTypes';
import axios from '../../config/axios';
import { ActionTypes } from '../actions';
import { concatActions } from '../../helpers';

const api: Middleware = () => (next: Dispatch) => (action: ActionTypes) => {
  const { type } = action;
  if (!action.api) {
    return next(action);
  }
  next(action);
  return axios
    .request({
      ...action.api,
      params: {
        ...action.api.params,
      },
    })
    .then((response) => {
      next({
        ...action,
        type: concatActions(type, SUCCESS),
        response: response.data,
      });
      if (action.redirect) {
        action.redirect.history.replace(action.redirect.path);
      }
    })
    .catch((error) => {
      next({ ...action, type: concatActions(type, FAIL), error });
      next({
        ...action,
        type: API + FAIL,
        error: error.response,
      });
    });
};

export default api;
