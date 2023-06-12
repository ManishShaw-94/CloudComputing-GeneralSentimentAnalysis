/*

The <CountryModal /> component:

This component renders a modal on an overlay and is rendered when the user clicks 
on the  filter option  which is available for "Age wise distribution" section 
and "Population diversity" section.

For "Age wise distribution" it displays a range of age-groups to select from.
For "Population diversity" it displays a range of countries to select from.

*/

import React from "react";
import Styles from "./styles";
import cancelIcon from "../../images/cancel.png";

export default class CountryModal extends React.Component {
  render() {
    return (
      <Styles>
        <div className="modalContainer">
          <div className="modal">
            <img
              src={cancelIcon}
              className="cancel"
              onClick={this.props.closeCountryModal}
            />
            <div className="modalTitle">
              Choose your desired{" "}
              {this.props.isCountry ? "population" : "age group"}
            </div>
            {this.props.isCountry && (
              <div className="modalSubtitle">
                {[
                  { abb: "p", meaning: "population" },
                  { abb: "m", meaning: "male" },
                  { abb: "f", meaning: "female" },
                ].map((ele) => {
                  return (
                    <div
                      key={ele.abb}
                      className="abbBox"
                    >{`${ele.abb} = ${ele.meaning}`}</div>
                  );
                })}
              </div>
            )}
            <div className="countryList">
              {this.props.data &&
                this.props.data.map((country) => {
                  return (
                    country && (
                      <div
                        key={country}
                        className="countryName"
                        onClick={() => {
                          this.props.isCountry
                            ? this.props.setCountry(country)
                            : this.props.setAgeGroup(country);
                        }}
                      >
                        {country}
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}
