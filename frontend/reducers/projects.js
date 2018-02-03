import * as projectActions from '../actions/projectActions';

const initialState = {
  isLoadingProjects: false,
  items: undefined,
  selected: undefined,
};

export default function project(state = initialState, action = {}) {
  switch (action.type) {
    case projectActions.FETCH_REPOS:
      return {...state, isLoadingProjects: true};
    case projectActions.FETCH_REPOS_SUCCESS:
      return {...state, isLoadingProjects: false, items: action.res};
    case projectActions.FETCH_REPOS_ERROR400:
    case projectActions.FETCH_REPOS_ERROR500:
    case projectActions.FETCH_REPOS_FAILURE:
      return {...state, isLoadingProjects: false};
    default:
      return state;
  }
}