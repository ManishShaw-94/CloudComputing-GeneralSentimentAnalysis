/*

The <App /> component:

This is the controller component which decides the UI to be rendered
depending on the user clicks.

<Navigator /> is rendered throughout the user journey. 
<TeamModal /> is rendered when the user clicks on "GROUP 65" in <Navigator />
<About /> is rendered when the users clicks on the "About" section in <Navigator />.
<AustraliaMap /> is rendered when the users clicks on the any of the politicians in <Navigator />.
<StateTerritoryMap /> is rendered when the user clicks on any state/territory in <AustraliaMap />.
<Loader /> is rendered when the UI is waiting for "/api/summary" to return a response.
An error message is rendered when "/api/summary" returns an error.

*/

import React from "react";
import StateTerritoryMap from "./components/StateTerritoryMap";
import AustraliaMap from "./components/AustraliaMap";
import Styles from "./styles";
import Navigator from "./components/Navigator";
import About from "./components/About";
import Loader from "react-loader-spinner";
import TeamModal from "./components/TeamModal";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      st: null,
      selected: "about",
      mapData: null,
    };
  }


  setClickedState = (st) => {
    this.setState({ st });
  };

  onBackClick = () => {
    this.setState({ st: null });
  };

  setSelected = (selected) => {
    this.setState({
      selected,
      st: null,
    });
  };

  setSentimentData = (sentiment_data) => {
    this.setState({
      sentiment_data,
      error: false,
    });
  };

  showLoader = () => {
    this.setState({
      loader: true,
    });
  };

  hideLoader = () => {
    this.setState({
      loader: false,
    });
  };

  showError = () => {
    this.setState({
      error: true,
    });
  };

  openTeamModal = () => {
    this.setState({
      teamModal: true,
    });
  };

  closeTeamModal = () => {
    this.setState({
      teamModal: false,
    });
  };

  render() {
    return (
      <Styles>
        <div className="parentContainer">
          {this.state.teamModal && (
            <TeamModal closeTeamModal={this.closeTeamModal} />
          )}
          <div className="navigatorContainer">
            <Navigator
              setSelected={this.setSelected}
              setSentimentData={this.setSentimentData}
              showLoader={this.showLoader}
              hideLoader={this.hideLoader}
              showError={this.showError}
              openTeamModal={this.openTeamModal}
            />
          </div>
          <div className="mainContainer">
            {this.state.selected == "about" ? (
              <About />
            ) : !this.state.loader ? (
              this.state.error ? (
                <div className="errorContainer">
                  <img
                    src="https://i.ibb.co/SQ1GZQq/error.jpg"
                    className="errorImage"
                  />
                  <div className="somethingWentWrong">SOMETHING WENT WRONG</div>
                  <div className="errorMessage">
                    Sorry Richard! We promise it was working before. Let us fix
                    this and get back ASAP!
                  </div>
                </div>
              ) : this.state.st ? (
                <StateTerritoryMap
                  st={this.state.st}
                  onBackClick={this.onBackClick}
                  data={
                    this.state.sentiment_data &&
                    this.state.sentiment_data.lga_wise
                  }
                />
              ) : (
                <AustraliaMap
                  setClickedState={this.setClickedState}
                  data={
                    this.state.sentiment_data &&
                    this.state.sentiment_data.state_wise
                  }
                />
              )
            ) : (
              <div className="loaderContainer">
                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                <div className="loading">Loading...</div>
              </div>
            )}
          </div>
        </div>
      </Styles>
    );
  }
}
