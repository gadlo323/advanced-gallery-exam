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
    };
  }

  calcImageSize() {
    const { galleryWidth } = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = galleryWidth / imagesPerRow;
    this.setState({
      size,
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  rotateImage() {
    this.setState({
      rotate: this.state.rotate + 90,
    });
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    const { remoeveImage, dto } = this.props;
    const { rotate, size } = this.state;
    return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(dto)})`,
          width: size + "px",
          height: size + "px",
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <div>
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
          <FontAwesome className="image-icon" name="expand" title="expand" />
        </div>
      </div>
    );
  }
}

export default Image;
