/*

The <AussieMap /> component:

This component is rendered when the user clicks on any of the 9 politicians in 
the <Navigator /> component. 

It renders all the states/territories of Australia and represnts an average sentiment score
in all the states/territories for the selected politician.

On clicking on any state/territory renders the <StateTerritoryMap /> component.

*/


import React from "react";
import AustraliaMap from "react-australia-map";
import { scaleLinear, scaleQuantile } from "d3-scale";
import gradients from "../../data/gradient.json";

export default class AussieMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentimentColorScale: null,
    };
  }

  componentDidMount() {
    if (this.props.data) {
      let sentimentColorScale = scaleQuantile()
        .domain([-1, 0, 1])
        // .domain(Object.keys(this.props.data).map((st) => this.props.data[st]))
        .range(gradients.red_to_green);
      this.setState({ sentimentColorScale });
    }
  }

  mapHandler = (event) => {
    this.props.setClickedState(event.target.dataset.name);
  };

  render() {
    const { sentimentColorScale } = this.state;
    let customStyling = null;
    if (sentimentColorScale)
      customStyling = {
        NSW: {
          fill: sentimentColorScale(this.props.data && this.props.data["NSW"]),
          showLabels: true,
          label: {
            name: `New South Wales\n${
              this.props.data && this.props.data["NSW"]
            }`,
            textAnchor: "middle",
            fill: "#424242",
            fontSize: 5,
          },
        },
        NT: {
          fill: sentimentColorScale(this.props.data && this.props.data["NT"]),
          showLabels: true,
          label: {
            name: `Northern Territory\n${
              this.props.data && this.props.data["NT"]
            }`,
            textAnchor: "middle",
            fill: "#424242",
            fontSize: 5,
          },
        },
        VIC: {
          fill: sentimentColorScale(this.props.data && this.props.data["VIC"]),
          showLabels: true,
          label: {
            name: `Victoria\n${this.props.data && this.props.data["VIC"]}`,
            textAnchor: "middle",
            fill: "#424242",
            fontSize: 5,
          },
        },
        SA: {
          fill: sentimentColorScale(this.props.data && this.props.data["SA"]),
          showLabels: true,
          label: {
            name: `South Australia\n${
              this.props.data && this.props.data["SA"]
            }`,
            textAnchor: "middle",
            fill: "#424242",
            fontSize: 5,
          },
        },
        WA: {
          fill: sentimentColorScale(this.props.data && this.props.data["WA"]),
          showLabels: true,
          label: {
            name: `Western Australia\n${
              this.props.data && this.props.data["WA"]
            }`,
            textAnchor: "middle",
            fill: "#424242",
            fontSize: 5,
          },
        },
        ACT: {
          fill: sentimentColorScale(this.props.data && this.props.data["ACT"]),
          showLabels: true,
          label: {
            name: `Australian Capital Territory\n${
              this.props.data && this.props.data["ACT"]
            }`,
            // textAnchor: "middle",
            fill: "#424242",
            fontSize: 4,
          },
        },
        TAS: {
          fill: sentimentColorScale(this.props.data && this.props.data["TAS"]),
          showLabels: true,
          label: {
            name: `Tasmania\n${this.props.data && this.props.data["TAS"]}`,
            textAnchor: "middle",
            fill: "#424242",
            fontSize: 5,
          },
        },
        QLD: {
          fill: sentimentColorScale(this.props.data && this.props.data["QLD"]),
          showLabels: true,
          label: {
            name: `Queensland\n${this.props.data && this.props.data["QLD"]}`,
            textAnchor: "middle",
            fill: "#424242",
            fontSize: 5,
          },
        },
      };

    return (
      <div className="australiaMapContaier">
        <AustraliaMap
          fill="#54788b"
          strokeWidth={1}
          customize={customStyling}
          width={"80%"}
          //   height={250}
          onClick={this.mapHandler}
        />
      </div>
    );
  }
}
