import styled from "styled-components";

const Styles = styled.div`
  body {
    .root {
      .pageLoaderContainer {
        display: none;
      }
    }
  }
  .parentContainer {
    position: relative;
    display: flex;
    height: 100vh;
    width: 100vw;

    .navigatorContainer {
      width: 25vw;
    }

    .mainContainer {
      flex: 1;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      // .backButton {
      //   position: absolute;
      //   top: 5px;
      //   left: 5px;
      //   border-radius: 10px;
      //   margin: 5px 10px;
      //   font-size: 20px;
      //   font-weight: 600;
      //   cursor: pointer;
      // }

      .loaderContainer {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f1f1f1;

        .loading {
          color: #b1b1b1;
          font-size: 17px;
          text-align: center;
          font-weight: 400;
          font-family: cursive;
          margin-top: 15px;
        }
      }

      .errorContainer {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f1f1f1;

        .errorImage {
          width: 54%;
          margin-bottom: 30px;
        }
        .somethingWentWrong {
          color: #818286;
          font-size: 30px;
          font-weight: bolder;
          margin-bottom: 20px;
          font-family: monospace;
        }
        .errorMessage {
          color: #b1b1b1;
          font-size: 15px;
          text-align: center;
          font-weight: 400;
          font-family: cursive;
        }
      }

      .australiaMapContaier {
        background-color: rgb(178, 210, 222);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
    }
  }
`;

export default Styles;
