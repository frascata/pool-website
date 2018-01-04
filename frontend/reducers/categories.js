import * as categoryActions from '../actions/categoryActions';

const initialState = {
  isLoadingCategories: false,
  items: undefined,
};

export default function category(state = initialState, action = {}) {
  switch (action.type) {
    case categoryActions.FETCH_CATEGORIES:
      return {...state, isLoadingCategories: true};
    case categoryActions.FETCH_CATEGORIES_SUCCESS:
      return {...state, isLoadingCategories: false, items: action.res};
    case categoryActions.FETCH_CATEGORIES_ERROR400:
    case categoryActions.FETCH_CATEGORIES_ERROR500:
    case categoryActions.FETCH_CATEGORIES_FAILURE:
      return {...state, isLoadingCategories: false};
    default:
      return state;
  }
}