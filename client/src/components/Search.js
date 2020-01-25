import React, { Fragment, Component } from "react";
import axios from "axios";

class Search extends Component {
  state = {
    items: [],
    isLoaded: false
  };

  Search = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json"
        }
      };
      const res = await axios.get("/api/locator", config);
      const data = JSON.parse(res.data);

      console.log(typeof data.results);
      this.setState({
        items: data.results,
        isLoaded: true
      });
      console.log(this.state.items);
      //   console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h1>Search your destination</h1>
          <button onClick={this.Search}>Button</button>
        </div>
      );
    } else {
      return (
        <Fragment>
          <div>
            {this.state.items.map(item => (
              <div>
                <li key={item.id}>Name: {item.name}</li>
              </div>
            ))}
          </div>
        </Fragment>
      );
    }
  }
}

export default Search;
