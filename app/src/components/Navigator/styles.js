import styled from "styled-components";

const NavigatorStyles = styled.div`
  .selected {
    color: #eceef0 !important;
    font-weight: 600 !important;
    font-size: 19px !important;
  }

  .highlight {
    background-color: #243f5d !important;
  }

  .navigator {
    background-color: #112337;
    // padding: 30px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .group65Container {
      margin-bottom: 50px;
      padding: 30px 30px 0;

      .group65 {
        color: #abb2ba;
        font-size: 15px;
        border: 1px solid #3a526c;
        border-radius: 10px;
        padding: 5px 17px;
        margin-left: auto;
        width: max-content;
        font-weight: bold;
        cursor: pointer;

        &:hover {
          background-color: #fff;
          color: #112337;
        }
      }
    }

    .aboutContainer {
      width: 100%;
      box-sizing: border-box;
      padding: 15px 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 66px;
      //   border-radius: 10px;

      &:hover {
        background-color: #243f5d;
      }

      .aboutIcon {
        height: 30px;
        margin-right: 25px;
      }
      .largerAboutIcon {
        height: 33px;
        margin-right: 25px;
      }

      .about {
        color: #a4acb4;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .horizontalLine {
      height: 1px;
      width: 100%;
      background-color: #3a526c;
      border-radius: 10px;
      margin-bottom: 35px;
      //   padding: 0 30px;
    }
  }

  .choose {
    color: #3a526c;
    font-size: 13px;
    font-weight: 800;
    border-bottom: 1px solid #3a526c;
    margin-bottom: 15px;
    padding: 0 30px;
  }

  .politiciansList {
    flex: 1;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 5px !important;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #888 !important;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #f1f1f1 !important;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555 !important;
    }

    .politicianContainer {
      display: flex;
      align-items: center;
      padding: 10px 30px;
      box-sizing: border-box;
      height: 66px;
      cursor: pointer;
      //   border-radius: 10px;

      &:hover {
        background-color: #243f5d;
      }

      .imageContainer {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 25px;
        box-sizing: border-box;

        .selectedIcon {
          border-radius: 50%;
          width: 100%;
        }
        .unselectedIcon {
          border-radius: 50%;
          width: 100%;
          filter: grayscale(1);
        }
      }
      .nameDescription {
        flex: 1;

        .name {
          color: #a4acb4;
          font-size: 18px;
          font-weight: 500;
        }
        .description {
          color: #a4acb4;
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }
`;

export default NavigatorStyles;
