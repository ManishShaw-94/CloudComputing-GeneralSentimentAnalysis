/*

The <StateTerritoryMap /> component:

This component gets rendered when the user clicks on any state/territory in the
<AustraliaMap /> component. 

It renders the average sentiment score for the selected politician LGA-wise 
on the left and renders the data for the selected option ("Economy size", 
"Age wise distribution", "Population diversity") LGA-wise on the right.

It also provides a toolbar in the top which includes:
1. A back button for returning to the Australia map UI.
2. The 3 options against which the user wants to compare the sentiment score.
3. A filter which is available for the last 2 of the 3 options.
4. "Compare on a graph" button for comparing sentiment score against the selected option
   on an appropriate graph.
5. The name of the selected state/territory.

*/


import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import VIC from "../../../data/lga/VIC.json";
import WA from "../../../data/lga/WA.json";
import TAS from "../../../data/lga/TAS.json";
import SA from "../../../data/lga/SA.json";
import QLD from "../../../data/lga/QLD.json";
import NT from "../../../data/lga/NT.json";
import NSW from "../../../data/lga/NSW.json";
import ACT from "../../../data/lga/ACT.json";
import coordinates from "../../../data/coordinates.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import { scaleBand, scaleLinear, scaleQuantile } from "d3-scale";
import Styles from "./styles";
import highlighted_arrow from "../../images/arrow (2).png";
import CountryModal from "../CountryModal";
import {
  VICAge,
  VICFinance,
  WAAge,
  WAFinance,
  TASAge,
  TASFinance,
  SAAge,
  SAFinance,
  QLDAge,
  QLDFinance,
  NTAge,
  NTFinance,
  NSWAge,
  NSWFinance,
  ACTAge,
  ACTFinance,
} from "../Data";
import Graph from "../Graph";
import { ContinuousColorLegend } from "react-vis";
import gradients from "../../../data/gradient.json";

export default class StateTerritoryMap extends Component {
  state = {
    color: "#ffff00",
    selected_population: "india_p",
    option: 0,
    selected_age_group: "30_40",
  };

  colors = ["green", "blue", "yellow", "orange", "grey"];

  componentDidMount() {
    let mapData = null;
    let ageData = null;
    let financeData = null;
    let state_territory_name = null;
    let countries = [];

    countries = Object.keys(VIC.features[0].properties).map((ele) => {
      if (ele.endsWith("_p") || ele.endsWith("_m") || ele.endsWith("_f"))
        return ele;
    });

    switch (this.props.st) {
      case "VIC":
        mapData = VIC;
        ageData = VICAge;
        financeData = VICFinance;
        state_territory_name = "Victoria";
        break;
      case "ACT":
        mapData = ACT;
        ageData = ACTAge;
        financeData = ACTFinance;
        state_territory_name = "Australian Capital Territory";
        break;
      case "NSW":
        mapData = NSW;
        ageData = NSWAge;
        financeData = NSWFinance;
        state_territory_name = "New South Wales";
        break;
      case "QLD":
        mapData = QLD;
        ageData = QLDAge;
        financeData = QLDFinance;
        state_territory_name = "Queensland";
        break;
      case "NT":
        mapData = NT;
        ageData = NTAge;
        financeData = NTFinance;
        state_territory_name = "Northern Territory";
        break;
      case "SA":
        mapData = SA;
        ageData = SAAge;
        financeData = SAFinance;
        state_territory_name = "South Australia";
        break;
      case "WA":
        mapData = WA;
        ageData = WAAge;
        financeData = WAFinance;
        state_territory_name = "Western Australia";
        break;
      case "TAS":
        mapData = TAS;
        ageData = TASAge;
        financeData = TASFinance;
        state_territory_name = "Tasmania";
        break;
      default:
        mapData = null;
    }
    const colorScale = scaleQuantile()
      .domain(
        this.state.option == 0
          ? financeData.features.map((d) => d.properties.btovr_meas)
          : this.state.option == 1
          ? ageData.map((d) => d["30_40"])
          : mapData.features.map((d) => d.properties.india_p)
      )
      .range(gradients.white_to_brown);

    const sentimentColorScale = scaleQuantile()
      .domain(Object.keys(this.props.data).map((lga) => this.props.data[lga]))
      // .domain([-1, 0, 1])
      .range(gradients.red_to_green);

    mapData.features.forEach((ele, index) => {
      for (let i = 0; i < financeData.features.length; i++) {
        if (
          financeData.features[i].properties.lga2011 ==
          ele.properties.lga_code_2016
        ) {
          ele.properties["economy_size"] =
            financeData.features[i].properties.btovr_meas;
        }
      }
      for (let i = 0; i < ageData.length; i++) {
        if (ageData[i].lga_code_2016 == ele.properties.lga_code_2016) {
          Object.keys(ageData[i]).forEach((key) => {
            if (key != "lga_code_2016" && key != "lga_name_2016") {
              ele.properties[key] = ageData[i][key];
            }
          });
        }
      }
    });

    // console.log(mapData);

    this.setState({
      mapData,
      ageData,
      financeData,
      colorScale,
      sentimentColorScale,
      state_territory_name,
      countries,
    });
  }

  countryStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 1,
  };

  changeCountryColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: this.state.color,
      fillOpacity: 1,
    });
  };

  onEachCountry = (country, layer) => {
    const colorScale = scaleQuantile()
      .domain(
        this.state.option == 0
          ? this.state.financeData.features.map((d) => d.properties.btovr_meas)
          : this.state.option == 1
          ? this.state.ageData.map((d) => d[this.state.selected_age_group])
          : this.state.mapData.features.map(
              (d) => d.properties[this.state.selected_population]
            )
      )
      .range(gradients.white_to_brown);

    const lga = country.properties.lga_name16;
    const stat =
      this.state.option == 0
        ? country.properties.economy_size
        : this.state.option == 1
        ? country.properties[this.state.selected_age_group]
        : country.properties[this.state.selected_population];
    layer.bindPopup(`${lga}  ${stat}`);
    layer.bindTooltip(`${lga}  ${stat}`).openTooltip();
    layer.options.fillColor = colorScale(stat);
  };

  onEachLGA = (lga, layer) => {
    if (this.props.data) {
      const lga_name = lga.properties.lga_name16;
      layer.bindPopup(`${lga_name}  ${this.props.data[lga_name]}`);
      layer
        .bindTooltip(`${lga_name}  ${this.props.data[lga_name]}`)
        .openTooltip();
      layer.options.fillColor = this.state.sentimentColorScale(
        this.props.data[lga_name]
      );
    }
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  mouseOnBackButton = () => {
    this.setState({
      mouse_on_back_button: true,
    });
  };

  mouseOffBackButton = () => {
    this.setState({
      mouse_on_back_button: false,
    });
  };

  openCountryModal = () => {
    this.setState({
      show_modal: true,
    });
  };

  setCountry = (selected_population) => {
    this.setState({
      selected_population,
      show_modal: false,
    });
  };

  setAgeGroup = (selected_age_group) => {
    this.setState({
      selected_age_group,
      show_modal: false,
    });
  };

  closeCountryModal = () => {
    this.setState({
      show_modal: false,
    });
  };

  setOption = (option) => {
    this.setState({
      option,
    });
  };

  showGraph = () => {
    this.setState({
      graph: true,
    });
  };

  closeGraph = () => {
    this.setState({
      graph: false,
    });
  };

  render() {
    return (
      <Styles>
        {this.state.graph && (
          <Graph
            closeGraph={this.closeGraph}
            sentimentScore={this.props.data}
            comparisonData={this.state.mapData.features}
            option={this.state.option}
            feature={
              this.state.option == 0
                ? "economy_size"
                : this.state.option == 1
                ? this.state.selected_age_group
                : this.state.selected_population
            }
          />
        )}
        {this.state.show_modal && (
          <CountryModal
            data={
              this.state.option == 1
                ? Object.keys(this.state.ageData[0]).map((ele) => {
                    if (ele != "lga_code_2016" && ele != "lga_name_2016") {
                      return ele;
                    }
                  })
                : this.state.countries
            }
            isCountry={this.state.option == 2}
            setCountry={this.setCountry}
            setAgeGroup={this.setAgeGroup}
            closeCountryModal={this.closeCountryModal}
          />
        )}
        <div className="header">
          <img
            src={
              this.state.mouse_on_back_button
                ? highlighted_arrow
                : "https://i.ibb.co/MnJhg5g/arrow.png"
            }
            className="backButton"
            onMouseOver={this.mouseOnBackButton}
            onMouseOut={this.mouseOffBackButton}
            onClick={this.props.onBackClick}
          />
          <div className="title">
            <div>Sentiment score VS</div>
            <div className="comparisonOptions">
              {[
                {
                  img_src: "https://i.ibb.co/DDgpKYs/money.png",
                  tooltip: "Economy size",
                },
                {
                  img_src: "https://i.ibb.co/HCPTTLF/grandfather.png",
                  tooltip: "Age wise distribution",
                },
                {
                  img_src: "https://i.ibb.co/VT4LJ5r/population.png",
                  tooltip: "Population diversity",
                },
              ].map((ele, index) => {
                return (
                  <div
                    onClick={() => {
                      this.setOption(index);
                    }}
                    className={`optionContainer ${
                      this.state.option == index ? "optionSelected" : ""
                    }`}
                  >
                    <img
                      src={ele.img_src}
                      className={`optionImage ${
                        this.state.option == index ? "optionImageSelected" : ""
                      }`}
                    />
                    <div className="tooltip">{ele.tooltip}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="filterAndName">
            {this.state.option > 0 && (
              <div className="filterContainer">
                <img
                  src="https://i.ibb.co/88nyXGG/filterp.png"
                  className="filterIcon"
                />
                <div
                  className="selectedPopulation"
                  onClick={this.openCountryModal}
                >
                  {this.state.option == 1
                    ? this.state.selected_age_group
                    : this.state.selected_population}
                </div>
              </div>
            )}
            <div onClick={this.showGraph} className="optionContainer">
              <img
                src="https://i.ibb.co/6Z73NdM/statistics.png"
                className="optionImage"
                style={{ height: 28, marginRight: 5 }}
              />
              <div className="tooltip">Compare on a grpah</div>
            </div>
            <div className="stateTerritoryName">
              {this.state.state_territory_name}
            </div>
          </div>
        </div>
        <div className="mapContainer">
          <div className="legend" style={{ right: "46vw" }}>
            <ContinuousColorLegend
              width={300}
              startTitle="Negative Sentiment"
              midTitle="Neutral"
              endTitle="Positive Sentiment"
              startColor="red"
              midColor="white"
              endColor="green"
            />
          </div>

          <div className="legend" style={{ right: "8.5vw" }}>
            <ContinuousColorLegend
              width={300}
              startTitle="Low"
              endTitle="High"
              startColor="#ffffff"
              endColor="#640101"
            />
          </div>
          <Map
            style={{ height: "92vh" }}
            zoom={coordinates[this.props.st]["zoom"]}
            center={coordinates[this.props.st]["center"]}
          >
            <GeoJSON
              key={this.state.selected_population}
              style={this.countryStyle}
              data={this.state.mapData && this.state.mapData.features}
              onEachFeature={this.onEachLGA}
            />
          </Map>
          <div className="separator" />
          {this.state.option == 0 ? (
            <Map
              style={{ height: "92vh" }}
              zoom={coordinates[this.props.st]["zoom"]}
              center={coordinates[this.props.st]["center"]}
            >
              <GeoJSON
                key={this.state.option}
                style={this.countryStyle}
                data={this.state.mapData && this.state.mapData.features}
                onEachFeature={this.onEachCountry}
              />
            </Map>
          ) : this.state.option == 1 ? (
            <Map
              style={{ height: "92vh" }}
              zoom={coordinates[this.props.st]["zoom"]}
              center={coordinates[this.props.st]["center"]}
            >
              <GeoJSON
                key={this.state.selected_age_group}
                style={this.countryStyle}
                data={this.state.mapData && this.state.mapData.features}
                onEachFeature={this.onEachCountry}
              />
            </Map>
          ) : (
            <Map
              style={{ height: "92vh" }}
              zoom={coordinates[this.props.st]["zoom"]}
              center={coordinates[this.props.st]["center"]}
            >
              <GeoJSON
                key={this.state.selected_population}
                style={this.countryStyle}
                data={this.state.mapData && this.state.mapData.features}
                onEachFeature={this.onEachCountry}
              />
            </Map>
          )}
        </div>
      </Styles>
    );
  }
}
