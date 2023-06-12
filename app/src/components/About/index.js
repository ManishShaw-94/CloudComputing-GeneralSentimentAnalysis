/*

The <About /> component:

This component is rendered when the users clicks on the "About" section in <Navigator />.
This renders a UI giving an overview of the what our problem statement is about.

*/

import React from "react";
import Styles from "./styles";

export default class About extends React.Component {
  render() {
    return (
      <Styles>
        <div className="aboutContainer">
          <div className="title">
            General Sentiment Towards Some Politicians
          </div>
          <div className="description">
            This project is an attempt towards capturing a general sentiment
            shared by the Aussies towards their Premeirs and Chief Ministers and
            the Prime Minister. You can select one of the nine politicians
            available in the navigator in the left and you will be able to
            observe state-wise distribution of an average sentiment score for
            the selected politician. You can further drill down any state by
            clicking on the state on the map. This gives an average distribution
            as per the local government areas as defined in 2020.
          </div>
          <div className="scope">
            Although limited in scope, this project can be extended further to
            give a search capability to the user wherein the user can search for
            any famous politician and our system will capture the sentiment on
            various levels of areas. This can be a useful model to predict the
            result of an upcoming election.
          </div>
        </div>
      </Styles>
    );
  }
}
