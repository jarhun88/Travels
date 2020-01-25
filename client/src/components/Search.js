import React, { Fragment, Component } from "react";
import axios from "axios";
import "../Search.css";

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
    return (
      <Fragment>
        <div>
          <h1>Search your destination</h1>
          <button onClick={this.Search}>Button</button>
        </div>
        <div class="border">
          {this.state.items.map(item => (
            <div class="box">
              <h3 key={item.id}>Name: {item.name}</h3>
              <h4>Address: {item.formatted_address}</h4>
              <h5>Rating: {item.rating}</h5>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Search;
