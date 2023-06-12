/*

The <ComparisonGraph /> component:

This component renders a modal on an overlay and is rendered when the user clicks
on "Compare on a graph" icon present for all the three comparison options: "Economy size", 
"Age wise distribution" and "Population diversity".

For "Economy size" it renders a scatter plot.
For the rest, it renders a bar graph.

*/


import React from "react";
import Styles from "./styles";
import cancelIcon from "../../images/cancel.png";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  MarkSeries,
  VerticalBarSeries,
  Hint,
} from "react-vis";
import "react-vis/dist/style.css";

export default class ComparisonGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    let data = null;

    if (this.props.option == 0) {
      data =
        this.props.comparisonData &&
        this.props.comparisonData.map &&
        this.props.comparisonData.map((ele, index) => {
          return {
            x: ele.properties[this.props.feature],
            y: this.props.sentimentScore[ele.properties.lga_name16],
          };
        });
    } else {
      if (this.props.option == 1 || this.props.option == 2) {
        let country_keys = [];
        let blacklist = [
          "tot_p",
          "country_birth_not_stated_p",
          "born_elsewhere_p",
        ];
        Object.keys(this.props.comparisonData[0].properties).forEach((ele) => {
          if (ele.endsWith("_p") && !blacklist.includes(ele))
            country_keys.push(ele);
        });
        let keys =
          this.props.option == 1
            ? ["15_30", "30_40", "40_50", "50_60", "60_and_above"]
            : country_keys;
        let aggreagation_keys = this.props.option == 1 ? keys : ["tot_p"];

        data = keys.map((key) => {
          let total_count = 0;
          let total_sentiment_score = 0;

          this.props.comparisonData &&
            this.props.comparisonData.forEach &&
            this.props.comparisonData.forEach((ele) => {
              if (ele.properties[key]) {
                total_count = total_count + parseInt(ele.properties[key]);
                total_sentiment_score =
                  total_sentiment_score +
                  parseInt(ele.properties[key]) *
                    this.props.sentimentScore[ele.properties.lga_name16];
              }
            });
          return {
            x: key,
            y: total_count ? total_sentiment_score / total_count : 0,
          };
        });
      }
    }
    this.setState({ data });
    // console.log(data);
  }

  render() {
    return (
      <Styles>
        <div className="modalContainer">
          <div className="modal">
            <img
              src={cancelIcon}
              className="cancel"
              onClick={this.props.closeGraph}
            />
            <XYPlot
              xType={this.props.option == 0 ? "linear" : "ordinal"}
              width={700}
              height={500}
              margin={{
                left: this.props.option == 0 ? 60 : 70,
                bottom: this.props.option == 1 ? 30 : 110,
              }}
            >
              <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
              <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
              <XAxis
                title={
                  this.props.option == 1
                    ? "Age Group (in years)"
                    : this.props.option == 2
                    ? "Country of origin"
                    : this.props.feature
                }
                tickFormat={
                  this.props.option == 2
                    ? (value) => value.replace("_p", "")
                    : (value) => value
                }
                tickLabelAngle={this.props.option == 1 ? 0 : -45}
                style={{
                  line: { stroke: "#ADDDE1" },
                  ticks: { stroke: "#ADDDE1" },
                  text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
                }}
              />
              <YAxis title="Sentiment Score" />
              {/* <LineSeries
                className="first-series"
                data={this.state.data}
                // style={{
                //   strokeLinejoin: "round",
                //   strokeWidth: 4,
                // }}
              /> */}
              {this.props.option == 0 ? (
                <MarkSeries
                  className="mark-series-example"
                  strokeWidth={2}
                  opacity="0.8"
                  sizeRange={[5, 15]}
                  data={this.state.data}
                  onValueMouseOver={(value, info) =>
                    this.setState({ hint: value })
                  }
                />
              ) : (
                <VerticalBarSeries
                  data={this.state.data}
                  onValueMouseOver={(value, info) =>
                    this.setState({ hint: value })
                  }
                />
              )}
              {this.state.hint ? <Hint value={this.state.hint} /> : null}
            </XYPlot>
          </div>
        </div>
      </Styles>
    );
  }
}
