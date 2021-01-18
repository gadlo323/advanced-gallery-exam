import React from "react";
import { DebounceInput } from "react-debounce-input";
import "./App.scss";
import Gallery from "../Gallery";
import ScrollTop from "../ScrollTop/ScrollTop";

class App extends React.Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      tag: "art",
      cover: "",
    };
  }

  /*The function gets a new image as a parameter and updates the background.*/
  updateCover(newCover) {
    this.setState(() => {
      return { cover: newCover };
    });
  }

  render() {
    const { tag, cover } = this.state;
    return (
      <div className="app-root">
        <div
          className="app-header"
          style={{
            backgroundImage: `url(${cover})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "50%",
          }}
        >
          <h2>Flickr Gallery</h2>
          <DebounceInput
            className="app-input"
            debounceTimeout={1000}
            onChange={(e) => this.setState({ tag: e.target.value })}
            value={tag}
          />
        </div>
        <ScrollTop />
        <Gallery tag={tag} cover={this.updateCover.bind(this)} />
      </div>
    );
  }
}

export default App;
