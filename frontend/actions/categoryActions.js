import { getLanguage, request } from '../utils';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR400 = 'FETCH_CATEGORIES_ERROR400';
export const FETCH_CATEGORIES_ERROR500 = 'FETCH_CATEGORIES_ERROR500';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export function fetchCategories() {
  return function (dispatch) {
    let url = `${process.env.BASE_API_URL}categories/?language=${getLanguage()}`;
    dispatch({type: FETCH_CATEGORIES});
    return request(
      url, {},
      (json) => { dispatch({type: FETCH_CATEGORIES_SUCCESS, res: json}); },
      (json) => { dispatch({type: FETCH_CATEGORIES_ERROR400, res: json}); },
      (res) => { dispatch({type: FETCH_CATEGORIES_ERROR500, res: res}); },
      (ex) => { dispatch({type: FETCH_CATEGORIES_FAILURE, error: ex}); },
    );
  };
}
