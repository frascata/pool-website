import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as projectActions from '../actions/projectActions';

import ProjectGallery from '../components/ProjectGallery';

const Spinner = styled.div`
.spinner {
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: black;
  height: 100%;
  width: 6px;
  display: inline-block;
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
`;

@connect(state => ({
  projects: state.projects,
}))
export default class HomeGalleryContainer extends React.Component {
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
          <Spinner>
            <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
          </Spinner>
        </div>
      </div>
    );
  }

  renderProjects() {
    if (this.props.projects.projects !== undefined) {
      return this.props.projects.projects.map((project) => {
        return <div className="col-md-6">
          <ProjectGallery key={project.id} project={project}/>
        </div>;
      });
    }
  }

  render() {
    let {projects} = this.props;
    if (projects.isLoadingProjects || projects.projects === undefined) {
      return this.renderLoading();
    }

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            {this.renderProjects()}
          </div>
        </div>
      </div>
    );
  }
}
