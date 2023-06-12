/*

The <Navigator /> component:

This component is rendered throughout the user journey.
It gives a list of 9 politicians to choose from and an "About" section.
Clicking on the "About" section render the <About /> component in the main UI.
Clicking on any of the 9 politicians makes an API call to "/api/summary" which
either returns the selected politicians data (<AussieMap /> component is rendered in the main UI)
or gives an error (an error message is rendered in the main UI).

"GROUP 65" in the top right corner represents our group number.

*/

import React from "react";
import Styles from "./styles";
import politicians from "../../../data/politicians.json";
import axiosInstance from "../../config";

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "about",
    };
  }

  setSelected = (selected) => {
    this.setState({
      selected: selected.full_name,
    });
    this.props.setSelected(selected.full_name);
    this.getSentimentScore(selected.screen_name);
  };

  getSentimentScore = (screen_name) => {
    this.props.showLoader();
    axiosInstance
      .post("/api/summary", {
        screen_name,
      })
      .then((res) => {
        this.props.setSentimentData(res.data);
      })
      .catch(() => {
        this.props.showError();
      })
      .finally(() => {
        this.props.hideLoader();
      });
  };

  render() {
    return (
      <Styles>
        <div className="navigator">
          <div className="group65Container">
            <div className="group65" onClick={this.props.openTeamModal}>
              GROUP 65
            </div>
          </div>
          <div
            className={`aboutContainer ${
              this.state.selected == "about" ? "highlight" : ""
            }`}
            onClick={() => {
              this.setState({ selected: "about" });
              this.props.setSelected("about");
            }}
          >
            <img
              src={
                this.state.selected == "about"
                  ? "https://i.ibb.co/dWX1ZfZ/home.png"
                  : "https://i.ibb.co/28vcmpm/about-unselected.png"
              }
              className={
                this.state.selected == "about" ? "largerAboutIcon" : "aboutIcon"
              }
            />
            <div
              className={`about ${
                this.state.selected == "about" ? "selected" : ""
              }`}
            >
              About
            </div>
          </div>
          <div className="horizontalLine" />
          <div className="choose">CHOOSE YOUR POLITICIAN</div>
          <div className="politiciansList">
            {politicians.map((politician) => {
              return (
                <div
                  key={politician.full_name}
                  className={`politicianContainer ${
                    this.state.selected == politician.full_name
                      ? "highlight"
                      : ""
                  }`}
                  onClick={() => {
                    this.setSelected(politician);
                  }}
                >
                  <div className="imageContainer">
                    <img
                      src={politician.img_src}
                      className={
                        this.state.selected == politician.full_name
                          ? "selectedIcon"
                          : "unselectedIcon"
                      }
                    />
                  </div>
                  <div className="nameDescription">
                    <div
                      className={`name ${
                        this.state.selected == politician.full_name
                          ? "selected"
                          : ""
                      }`}
                    >
                      {politician.full_name}
                    </div>
                    {this.state.selected == politician.full_name && (
                      <div className="description">
                        {politician.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Styles>
    );
  }
}
