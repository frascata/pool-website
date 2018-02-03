import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  padding-top: 20px;
  padding-bottom: 30px;
`;

const Gallery = styled.div`
  cursor: pointer;
  
  img {
    display: none;
  }
  
  img.active {
    display: block;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: rgba(255,255,255,0.9);
  }
  
  :hover .overlay {
    opacity: 1;
  }
  
  .text {
    color: #1d1d1b;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  
  .overlay-black {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: rgba(0,0,0,0.3);
  }
  
  :hover .overlay-black {
    opacity: 1;
  }
  
  .text-black {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  
  .text-black .project-item-url {
    color: white !important;
  }
`;

const GalleryItemTitle = styled.div`
  margin-top: 5px;
`;

export default class ProjectGallery extends React.Component {
  constructor(props) {
    super(props);
    this.imgGalleryElement = null;
    this.state = {
      imgGallery: null,
      intervalId: 0,
      currentImageIndex: 1,
    };

    this.loadGallery = this.loadGallery.bind(this);
  }

  componentDidMount() {
    let intervalId = setInterval(this.loadGallery, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  loadGallery() {
    let htmlGallery = this.props.project.images.slice(1,
      this.props.project.images.length).map((image, index) => {
      return <img key={index} className="img-responsive" src={image.src}
                  alt={image.title}/>;
    });
    this.setState({imgGallery: htmlGallery});
  }

  openProject(project) {
    window.location.href = `${window.location.origin}/${project.url}`;
  }

  render() {
    const {project} = this.props;
    const images = project.images;
    if (project.images && project.images.length > 0) {
      const firstImageSrc = project.previewImage || images[0]['src'];
      const firstImageAlt = project.previewImage || images[0]['title'];
      // const imagesNumber = project.images.length;

      let backgroundImageStyle = {
        backgroundImage: `url(${firstImageSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      };

      return (
        <Div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <Gallery className="project-gallery project-item-square" style={backgroundImageStyle}>
                  <div ref={(imgGallery) => {
                    this.imgGalleryElement = imgGallery;
                  }}>
                    {this.state.imgGallery}
                  </div>
                  <div className="overlay">
                    <div className="text">
                      <a className="project-item-url"
                         onClick={this.openProject.bind(this, project)}>+
                        info</a>
                    </div>
                  </div>
                </Gallery>
              </div>
            </div>
            <GalleryItemTitle className="row">
              <div className="col-xs-10">
                {project.title}
              </div>
            </GalleryItemTitle>
          </div>
        </Div>
      );
    }

    return null;
  }
}
