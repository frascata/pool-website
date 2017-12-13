import React from 'react';
import { connect } from 'react-redux';

import * as projectActions from '../actions/projectActions';

import { LazyLoadImage } from './LazyLoadImage';
import styled from 'styled-components';

export default class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgGallery: null,
      intervalId: 0,
      currentImageIndex: 1,
    };

    // this.loadGallery = this.loadGallery.bind(this);
  }

  // componentDidMount() {
  //   let intervalId = setInterval(this.loadGallery, 1000);
  //   // store intervalId in the state so it can be accessed later:
  //   this.setState({intervalId: intervalId});
  // }

  // componentWillUnmount() {
  //   // use intervalId from the state to clear the interval
  //   clearInterval(this.state.intervalId);
  // }

  // loadGallery() {
  //   let htmlGallery = this.props.project.images.slice(1,
  //     this.props.project.images.length).map((image, index) => {
  //     return <img key={index} className="img-responsive" src={image.src}
  //                 alt={image.title}/>;
  //   });
  //   this.setState({imgGallery: htmlGallery});
  // }

  renderImages() {
    const {project} = this.props;
    if (project.images && project.images.length > 0) {
      let images = project.images.slice(1, project.images.length);
      return images.map((image) => {
        return <div key={image.id}>
          <br/>
          <LazyLoadImage src={image.src}
                         alt={image.title}
                         transition={'opacity 1s ease-in-out'}
                         className={'img-responsive active'}/>
        </div>;
      });
    }
    return null;
  }

  render() {
    const {project} = this.props;

    if (project && project.images && project.images.length > 0) {
      const images = project.images;
      const firstImageSrc = images[0]['src'];
      const firstImageAlt = images[0]['title'];

      return (
        <div className="row">
          <div className="col-sm-4">
            <h2>{project.title}</h2>

            <p className="lead">{project.description}</p>

            <div className="pull-right">
              <p>{project.location}</p>
              <p>{project.date}</p>
            </div>
          </div>
          <div className="col-sm-8">
            <LazyLoadImage src={firstImageSrc}
                           alt={firstImageAlt}
                           transition={'opacity 1s ease-in-out'}
                           className={'img-responsive active'}/>
          </div>
          <div className="col-sm-12">
            {this.renderImages()}
          </div>
        </div>
      );
    }

    return null;
  }
}
