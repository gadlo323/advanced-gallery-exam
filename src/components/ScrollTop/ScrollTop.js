import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./ScrollTop.scss";
class ScrollTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.showVisibility.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.showVisibility.bind(this));
  }
  showVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: false,
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    const { show } = this.state;
    return (
      <div className="scroll-top">
        {show && (
          <div className="scroll-btn">
            <FontAwesome
              className="image-icon"
              name="angle-double-up"
              title="info"
              onClick={() => this.scrollToTop()}
            />
          </div>
        )}
      </div>
    );
  }
}
export default ScrollTop;
