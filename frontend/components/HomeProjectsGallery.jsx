import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { LazyLoadImage } from './LazyLoadImage';
import styled from 'styled-components';
import ProjectGallery from './ProjectGallery';

const Div = styled.div`
  padding-top: 20px;
  padding-bottom: 30px;
`;

const Gallery = styled.div`
  

`;

const GalleryFooter = styled.div`
  margin-top: 5px;
  
  .nav-gallery {
    padding-right: 2px;
    color: #ccc;
  }
  
  .nav-gallery.active {
    font-weight: bold;
    color: #1d1d1b;
  }
`;

export default class HomeProjectsGallery extends React.Component {
  constructor(props) {
    super(props);
    this.imgGalleryElement = null;
    this.state = {
      imgGallery: null,
      intervalId: 0,
      currentImageIndex: 1,
      currentProject: null,
      backgroundImageHeight: null,
      hiddenGallery: null,
    };

    this.loadGallery = this.loadGallery.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.openNextProject = this.openNextProject.bind(this);
  }

  componentDidMount() {
    let intervalId = setInterval(this.loadGallery, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});

    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    if (!this.state.currentProject) {
      const {projects} = this.props;
      this.setState({currentProject: projects[0]});
    }
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);

    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const HEADER_HEIGHT = 50 + 20;
    const PROJECT_TITLE_HEIGHT = 50 + 10;
    const FOOTER_HEIGHT = 50 + 15;

    let windowHeight = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;

    let backgroundImageHeight = windowHeight - HEADER_HEIGHT -
      PROJECT_TITLE_HEIGHT - FOOTER_HEIGHT;

    this.setState({backgroundImageHeight});
  }

  loadGallery() {
    const {projects} = this.props;
    const gallery = projects.map((project) => {
      return <img key={project.id} style={{display: 'none'}}
                  src={project.image.src}/>;
    });
    const hiddenGallery = ReactDOMServer.renderToString(<div>{gallery}</div>);
    this.setState({hiddenGallery: hiddenGallery});

    clearInterval(this.state.intervalId);
  }

  openProject(projectId) {
    const {projects} = this.props;
    let currentProject = projects.find((project) => project.id === projectId);
    this.setState({currentProject});
  }

  openNextProject() {
    const {projects} = this.props;
    let nextProjectIndex = projects.findIndex(
      (project) => project.id === this.state.currentProject.id) + 1;
    let currentProject;
    if (nextProjectIndex > projects.length - 1) {
      currentProject = projects[0];
    } else {
      currentProject = projects[nextProjectIndex];
    }
    this.setState({currentProject});
  }

  renderGalleryNavigation() {
    const {projects} = this.props;
    return projects.map((project) => {
      return <a key={project.id} className={this.state.currentProject &&
      this.state.currentProject.id === project.id
        ? 'nav-gallery active'
        : 'nav-gallery'}
                onClick={this.openProject.bind(this, project.id)}>
        <i className="fa fa-circle-o"/>
      </a>;
    });
  }

  render() {
    const {projects} = this.props;

    if (projects && projects.length > 0 && this.state.currentProject) {
      const project = this.state.currentProject;

      return (
        <Div>
          <Gallery className="row">
            <div className="col-xs-12">
              <div onClick={this.openNextProject} style={{
                cursor: 'pointer',
                height: this.state.backgroundImageHeight,
                backgroundImage: `url(${project.image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                transition: 'opacity 1s ease-in-out',
              }}/>
            </div>
          </Gallery>
          <GalleryFooter className="row">
            <div className="col-xs-6">
              {this.renderGalleryNavigation()}
            </div>
            <div className="col-xs-6">
              <div className="pull-right">
                <a className="project-item-url"
                   href={project.url}>{project.title}</a>
              </div>
            </div>
          </GalleryFooter>
          <div dangerouslySetInnerHTML={{
            __html: this.state.hiddenGallery,
          }}/>
        </Div>
      );
    }

    return null;
  }
}

