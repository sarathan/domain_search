import React from "react";
import "./App.css";
import Data from "./Data";
import sortByTime from "./utils/sortByTime";

export default class App extends React.Component {
  state = {
    text: '',
    items: null,
    isError: false,
    errorMessage: null,
    offSet: 0,
    limit: 10
  };

  handleClick = () => {
    fetch("https://www.reddit.com/r/" + this.state.text + ".json")
      .then(res => res.json())
      .then(
        (result) => {
          if (result.data !== undefined && result.data.children !== undefined) {
            this.setState({
              isError: false,
              items: sortByTime(result.data.children),
              offSet: 0,
              limit: 10
            });
          }
          else {
            this.setState({
              isError: true,
              errorMessage: "No data found"
            });
          }

        },
        () => {
          this.setState({
            isError: true,
            errorMessage: "No data found"
          });
        }
      )
  };

  handlePrev = () => {
    let offSet = this.state.offSet;
    let limit = this.state.limit;
    this.setState({
      offSet: offSet - 10,
      limit: limit - 10
    });
  }

  handleNext = () => {
    let offSet = this.state.offSet;
    let limit = this.state.limit;
    this.setState({
      offSet: offSet + 10,
      limit: limit + 10
    });
  }

  setText = event => {
    let text = event.target.value;
    this.setState({ text });


  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: "10px" }}>
          <input type="text" value={this.state.text} onChange={this.setText} />
          <button onClick={this.handleClick}>SEARCH</button>
        </div>
        <br />
        <div>
          {!this.state.isError && this.state.items && this.state.items.length > 0 && (
            <div>
              <Data {...this.state} />
              <div>
                <h1> No of Pages : {Math.round(this.state.items.length / 10)}  </h1>
                <button disabled={this.state.offSet === 0} onClick={this.handlePrev}>PREV</button>
                <button disabled={this.state.limit >= this.state.items.length} onClick={this.handleNext}>NEXT</button>
              </div>
            </div>)
          }
          {this.state.isError && (<div>{this.state.errorMessage}</div>)}
        </div>
      </div>




    );
  }
}
