import React from 'react';

export class LazyLoadImage extends React.Component {
  constructor(props) {
    super(props);
    this.imgElement = null;
    this.state = {
      src: null,
      lazyLoading: null,
    };
  }

  componentDidMount() {
    this.updateSrc(this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.updateSrc(nextProps.src);
    }
  }

  updateSrc(src) {
    if (this.props.transition) {
      this.setState({lazyLoading: true});
    }
    this.imgElement.setAttribute('src', src);
    this.imgElement.onload = () => {
      if (this.props.transition) {
        this.setState({lazyLoading: false});
      }
    };
  }

  render() {
    let {className, alt, height, width, transition} = this.props;
    let lazyLoadingStyle = {};

    if (transition) {
      lazyLoadingStyle = {
        opacity: 1,
        transition: transition // example 'opacity 1s ease-in-out'
      };
      if (this.state.lazyLoading) {
        lazyLoadingStyle = {
          opacity: 0,
        };
      }
    }

    return <img ref={(img) => {
      this.imgElement = img;
    }}
                className={className}
                alt={alt}
                height={height}
                width={width}
                style={lazyLoadingStyle}/>;
  }
}
