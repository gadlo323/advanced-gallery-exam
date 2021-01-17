import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "./Image.scss";

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotate: 0,
      scale: 1,
      zIndex: 0,
      isMounted: false,
    };
  }

  calcImageSize() {
    let screenWidth = document.body.clientWidth;
    const targetSize = 200;
    const imagesPerRow = Math.round(screenWidth / targetSize);
    const size = screenWidth / imagesPerRow;
    if (this.state.isMounted) {
      this.setState({
        size: size,
      });
    }
  }

  //Listening to the event resize& calls the calcImageSize function to set the image size.
  componentDidMount() {
    this.state.isMounted = true;
    window.addEventListener("resize", this.calcImageSize.bind(this));
  }

  //when the component is unloaded, destroy the event of resize
  componentWillUnmount() {
    this.state.isMounted = false;
    window.removeEventListener("resize", this.calcImageSize.bind(this));
  }

  // At the click event the rotate value is updated.
  rotateImage() {
    this.setState({
      rotate: this.state.rotate + 90,
    });
  }

  // At the click event the scale value & z-index value is updated.
  expandImage() {
    this.setState({
      scale: this.state.scale + 1,
      zIndex: this.state.zIndex + 100,
    });
  }

  // At the click event the scale value & z-index value is Return to default mode.
  closeExpand() {
    this.setState({
      scale: this.state.scale - 1,
      zIndex: this.state.zIndex - 100,
    });
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    const { remoeveImage, dto, onDragStart, onDrop } = this.props;
    const { rotate, size, scale, zIndex } = this.state;
    return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(dto)})`,
          width: size + "px",
          height: size + "px",
          transform: `rotate(${rotate}deg) scale(${scale})`,
          zIndex: zIndex,
        }}
        draggable
        onDragStart={(e) => onDragStart(e, dto.id)}
        onDrop={(e) => onDrop(e, this)}
      >
        {scale > 1 && (
          <span className="close" onClick={() => this.closeExpand()}>
            &times;
          </span>
        )}
        {scale === 1 && (
          <div className="on-drag">
            <FontAwesome
              className="image-icon"
              name="sync-alt"
              title="rotate"
              onClick={() => this.rotateImage()}
            />
            <FontAwesome
              className="image-icon"
              name="trash-alt"
              title="delete"
              onClick={() => remoeveImage(dto.id)}
            />
            <FontAwesome
              className="image-icon"
              name="expand"
              title="expand"
              onClick={() => this.expandImage()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Image;
