import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Image from "../Image";
import "./Gallery.scss";

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      loading: false,
      pageNumber: 1,
      noData: false,
    };
  }

  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  getImages(tag, notFirstTime) {
    this.setLoading();
    if (!notFirstTime) this.setState({ images: [] });
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&page=${this.state.pageNumber}&format=json&nojsoncallback=1`;
    const baseUrl = "https://api.flickr.com/";
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: "GET",
    })
      .then((res) => res.data)
      .then((res) => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState((state) => {
            return {
              images: [...state.images, ...res.photos.photo],
              noData: false,
            };
          });
        } else this.setState({ noData: true });
        this.setLoading();
        this.setState((state) => {
          return { pageNumber: state.pageNumber + 1 };
        });
      });
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth,
    });
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll.bind(this));
  }

  /*The function checks if the page is at the bottom 
  and if so activates the getImages function */
  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5 &&
      this.state.images.length &&
      !this.state.loading
    ) {
      this.getImages(this.props.tag, true);
    }
  };

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  setLoading() {
    this.setState({
      loading: !this.state.loading,
    });
  }

  /*The function accepts an image id and returns all values
   ​​that do not match the id And 
  updates the array of images.*/
  remoeveImage(id) {
    const newImages = this.state.images.filter((img) => img.id !== id);
    this.setState(() => {
      return { images: newImages };
    });
  }
  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e, target) {
    const { images } = this.state;
    e.preventDefault();
    const id = e.dataTransfer.getData("imageId"); // The ID of the box being dragged
    const dropPlaceId = target.props.dto.id; // The ID of the box where you drops

    /*Go through the array and look for the location of our two boxes
     and save the location and the object itself */
    for (let i = 0; i < images.length; i++) {
      if (images[i].id === id) var selectedBox = { place: i, data: images[i] };
      if (images[i].id === dropPlaceId)
        var replacedBox = { place: i, data: images[i] };
      if (replacedBox && selectedBox) break;
    }
    //Swap between the position of the two boxes in the array
    if (selectedBox && replacedBox) {
      images[selectedBox.place] = replacedBox.data;
      images[replacedBox.place] = selectedBox.data;

      this.setState(() => {
        return { images: images };
      });
    }
  }

  render() {
    const { galleryWidth, images, loading, noData } = this.state;
    return (
      <div className="gallery-root" onDragOver={(e) => this.onDragOver(e)}>
        {images.map((dto, index) => {
          return (
            <Image
              key={"image-" + dto.id + index}
              dto={dto}
              onDrop={this.onDrop.bind(this)}
              galleryWidth={galleryWidth}
              remoeveImage={this.remoeveImage.bind(this)}
            />
          );
        })}

        {noData && (
          <h3>You search did not return any results. Please try again. </h3>
        )}

        <span className={loading ? "spinner show" : "spinner hide"}></span>
      </div>
    );
  }
}

export default Gallery;
