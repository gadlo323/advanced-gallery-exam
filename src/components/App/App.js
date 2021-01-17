import React from "react";
import { DebounceInput } from "react-debounce-input";
import "./App.scss";
import Gallery from "../Gallery";

class App extends React.Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      tag: "art",
    };
  }

  render() {
    const { tag } = this.state;
    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <DebounceInput
            className="app-input"
            debounceTimeout={1000}
            onChange={(e) => this.setState({ tag: e.target.value })}
            value={tag}
          />
        </div>
        <Gallery tag={tag} />
      </div>
    );
  }
}

export default App;
