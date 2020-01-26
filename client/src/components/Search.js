import React, { Fragment, Component } from "react";
import axios from "axios";
import "../Search.css";

class Search extends Component {
  state = {
    items: [],
    isLoaded: false,
    searching: ""
  };

  handleChange = event => {
    this.setState({
      searching: event.target.value
    });
    console.log(this.state.searching);
  };

  Search = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json"
        }
      };
      const body = {
        searching: this.state.searching
      };

      JSON.stringify(body);
      const res = await axios.post("/api/locator", body, config);
      const data = JSON.parse(res.data);
      console.log(data.results);
      this.setState({
        items: data.results,
        isLoaded: true
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    return (
      <Fragment>
        <div className="wrap">
          <h1>Xplore somewhere new!</h1>
          <div>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
            <button onClick={this.Search}>Search</button>
          </div>
        </div>
        <div className="border">
          {this.state.items.map(item => (
            <div className="box">
              <h3 key={item.id}>Name: {item.name}</h3>
              <h4>Address: {item.formatted_address}</h4>
              <h5>Rating: {item.rating}</h5>
              {item.photos[0].photo_reference}
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Search;
