import React from 'react';
import { render } from 'react-dom';
import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import ProjectsGalleryContainer from './containers/ProjectsGalleryContainer';

let finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);
let reducer = combineReducers(reducers);
let store = finalCreateStore(reducer);

class ProjectsGallery extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ProjectsGalleryContainer/>
      </Provider>
    );
  }
}

render(<ProjectsGallery/>, document.getElementById('ProjectsGallery'));
