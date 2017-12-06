import React from 'react';
import { LazyLoadImage } from './LazyLoadImage';
import styled from 'styled-components';

const Gallery = styled.div`
  cursor: pointer;
  
  img {
    display: none;
  }
  img.active {
    display: block;
  }
`;

export default class ProjectGallery extends React.Component {
  constructor(props) {
    super(props);
    this.imgGalleryElement = null;
    this.state = {
      imgGallery: null,
      intervalId: 0,
      currentImageIndex: 1
    };

    this.loadGallery = this.loadGallery.bind(this);
    this.setActiveImage = this.setActiveImage.bind(this);
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

  setActiveImage() {
    let active = this.imgGalleryElement.getElementsByClassName('active');

    if (active[0].nextElementSibling) {
      active[0].nextElementSibling.className = 'img-responsive active';
      active[0].className = 'img-responsive';
    } else {
      active[0].className = 'img-responsive';
      this.imgGalleryElement.children[0].className = 'img-responsive active';
    }

    for (let i = 0; i < this.imgGalleryElement.children.length; i++) {
      if (this.imgGalleryElement.children[i].classList.contains('active'))
        this.setState({currentImageIndex: i+1});
    }
  }

  render() {
    const {project} = this.props;
    const images = project.images;
    if (project.images && project.images.length > 0) {
      const firstImageSrc = images[0]['src'];
      const firstImageAlt = images[0]['title'];
      const imagesNumber = project.images.length;

      return (
        <div className="row">
          <div className="col-md-12">
            <Gallery className="project-gallery">
              <div ref={(imgGallery) => {
                this.imgGalleryElement = imgGallery;
              }} onClick={this.setActiveImage}>
                <LazyLoadImage src={firstImageSrc}
                               alt={firstImageAlt}
                               transition={'opacity 1s ease-in-out'}
                               className={'img-responsive active'}/>
                {this.state.imgGallery}
              </div>
            </Gallery>
          </div>
          <div className="col-xs-6">
            {project.title}
          </div>
          <div className="col-xs-6">
            <div className="pull-right">
              {this.state.currentImageIndex} | {imagesNumber}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

