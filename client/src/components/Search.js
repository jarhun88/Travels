import React, { Fragment, Component } from "react";
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  async componentDidMount() {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json"
        }
      };
      const res = await axios.get("/api/locator", config);
      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  }

  render() {
    return (
      <Fragment>
        <h1>Search your destination</h1>
      </Fragment>
    );
  }
}

export default Search;
