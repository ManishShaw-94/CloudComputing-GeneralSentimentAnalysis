import styled from "styled-components";

const StateTerritoryMapStyles = styled.div`
  .header {
    background-color: #f2f3f5;
    padding: 15px 20px;
    box-shadow: 0 0 5px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8vh;
    box-sizing: border-box;

    .backButton {
      height: 40px;
      cursor: pointer;
    }

    .title {
      display: flex;
      align-items: center;
      font-size: 17px;
      font-weight: 600;

      .comparisonOptions {
        display: flex;
        align-items: center;
        margin-left: 10px;

        // .optionSelected {
        //   background-color: #dcf7fb;
        // }
      }
    }

    .optionContainer {
      border-radius: 50%;
      // height: 40px;
      // width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      position: relative;

      .tooltip {
        position: absolute;
        top: 38px;
        left: -23px;
        z-index: 9999;
        visibility: hidden;
        padding: 4px 10px;
        font-size: 12px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 5px;
        box-sizing: border-box;
        width: max-content;
      }

      &:hover {
        .tooltip {
          visibility: visible;
        }
      }

      .optionImage {
        height: 36px;
        cursor: pointer;
        filter: contrast(0);
        opacity: 0.5;
      }
      .optionImageSelected {
        filter: contrast(1);
        opacity: 1;
      }
    }

    .filterAndName {
      display: flex;
      align-items: center;

      .filterContainer {
        display: flex;
        align-items: center;
        margin-right: 10px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 5px 10px;
        background-color: #f6e2f6;

        .filterIcon {
          height: 20px;
          margin-right: 10px;
        }

        .selectedPopulation {
          color: ##500350;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .stateTerritoryName {
      background-color: #dcf7fb;
      padding: 5px 10px;
      border-radius: 5px;
      color: #13cae6;
      font-size: 17px;
      font-weight: 600;
    }
  }
  .mapContainer {
    background-color: rgb(178, 210, 222);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .legend{
      position: absolute;
      bottom: 46px;
      z-index: 9;

      .rv-continuous-color-legend .rv-gradient{
        height: 13px;
      }
    }

    .separator {
      width: 1px;
      height: 92vh;
      background-color: #112337;
    }

    .leaflet-container {
      background-color: rgb(178, 210, 222);
      width: 37.5vw;

      svg {
        width: 37.5vw;
        height: 92vh;
        transform: translate3d(0, 0, 0) !important;
      }
    }
  }
`;

export default StateTerritoryMapStyles;
