import React from 'react';
import { connect } from 'react-redux';

import * as projectActions from '../actions/projectActions';

import HomeProjectGallery from '../components/HomeProjectGallery';
import HomeProjectsGallery from '../components/HomeProjectsGallery';

@connect(state => ({
  projects: state.projects,
}))
export default class HomeGalleryContainer extends React.Component {
  componentDidMount() {
    let {dispatch, projects} = this.props;
    if (!projects.isLoadingProjects && projects.items === undefined) {
      dispatch(projectActions.fetchHomeProjects());
    }
  }

  renderLoading() {
    return (
      <div className="row">
        <div className="col-sm-12">
        </div>
      </div>
    );
  }

  renderProjects() {
    if (this.props.projects.items !== undefined) {
      return <HomeProjectsGallery projects={this.props.projects.items}/>;
      // return this.props.projects.items.map((project) => {
      //   return <div className="col-md-12" key={project.id} >
      //     <HomeProjectGallery project={project}/>
      //   </div>;
      // });
    }
  }

  render() {
    let {projects} = this.props;
    if (projects.isLoadingProjects || projects.items === undefined) {
      return this.renderLoading();
    }

    return (
      <div className="row">
        <div className="col-sm-12">
          {this.renderProjects()}
        </div>
      </div>
    );
  }
}
