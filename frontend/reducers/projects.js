import * as projectActions from '../actions/projectActions';

const initialState = {
  isLoadingProjects: false,
  projects: undefined,
  showModal: false,
  selected: undefined,
};

export default function project(state = initialState, action = {}) {
  switch (action.type) {
    case projectActions.FETCH_REPOS:
      return {...state, isLoadingProjects: true};
    case projectActions.FETCH_REPOS_SUCCESS:
      return {...state, isLoadingProjects: false, projects: action.res};
    case projectActions.FETCH_REPOS_ERROR400:
    case projectActions.FETCH_REPOS_ERROR500:
    case projectActions.FETCH_REPOS_FAILURE:
      return {...state, isLoadingProjects: false};
    case projectActions.OPEN:
      debugger
      return {...state, showModal: true, selected: action.project};
    case projectActions.CLOSE:
      return {...state, showModal: false, selected: undefined};
    default:
      return state;
  }
}