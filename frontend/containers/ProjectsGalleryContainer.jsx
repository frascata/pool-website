import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as projectActions from '../actions/projectActions';

import ProjectGallery from '../components/ProjectGallery';
import ProjectDetail from '../components/ProjectDetail';

@connect(state => ({
  projects: state.projects,
}))
export default class ProjectsGalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.projectDetailElement = null;
    this.projectsGalleryElement = null;

    this.state = {
      selectedProject: null
    };
    // this.openProject = this.openProject.bind(this);
    this.closeProject = this.closeProject.bind(this);
  }

  componentDidMount() {
    let {dispatch, projects} = this.props;
    if (!projects.isLoadingProjects && projects.projects === undefined) {
      dispatch(projectActions.fetchProjects());
    }
  }

  renderLoading() {
    return (
      <div className="row">
        <div className="col-sm-12">
          loading ciccio...
        </div>
      </div>
    );
  }

  openProject(project) {
    this.setState({selectedProject: project});

    if (this.projectDetailElement && this.projectsGalleryElement) {
      this.projectDetailElement.style.display = 'block';
      this.projectsGalleryElement.style.display = 'none';
    }
  }

  closeProject() {
    this.projectDetailElement.style.display = 'none';
    this.projectsGalleryElement.style.display = 'block';
  }

  renderProjects() {
    if (this.props.projects.projects !== undefined) {
      return this.props.projects.projects.map((project) => {
        return <div className="col-md-4" key={project.id}
                    onClick={this.openProject.bind(this, project)}>
          <ProjectGallery key={project.id} project={project}/>
        </div>;
      });
    }
  }

  renderProjectDetail() {
    return <div className="row">
      <div className="col-sm-12">
        <button onClick={this.closeProject}>X</button>
        <ProjectDetail project={this.state.selectedProject} />
      </div>
    </div>;
  }

  render() {
    let {projects} = this.props;
    if (projects.isLoadingProjects || projects.projects === undefined) {
      return this.renderLoading();
    }
    console.log(projects)
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="row" ref={(projectDetail) => {
            this.projectDetailElement = projectDetail;
          }} style={{display: 'none'}}>
            <div className="col-sm-12">
              {this.renderProjectDetail()}
            </div>
          </div>
          <div className="row" ref={(projectDetail) => {
            this.projectsGalleryElement = projectDetail;
          }}>
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-12">
                  <span>All</span> | <span>Paesaggio</span>
                  <h6>{projects.showModal}</h6>
                </div>
              </div>
              <div className="row">
                {this.renderProjects()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
