import * as githubActions from '../actions/projectActions';

const initialState = {
  isLoadingProjects: false,
  projects: undefined,
};

export default function project(state = initialState, action = {}) {
  switch (action.type) {
    case githubActions.FETCH_REPOS:
      return {...state, isLoadingProjects: true};
    case githubActions.FETCH_REPOS_SUCCESS:
      return {...state, isLoadingProjects: false, projects: action.res};
    case githubActions.FETCH_REPOS_ERROR400:
    case githubActions.FETCH_REPOS_ERROR500:
    case githubActions.FETCH_REPOS_FAILURE:
      return {...state, isLoadingProjects: false};
    default:
      return state;
  }
}