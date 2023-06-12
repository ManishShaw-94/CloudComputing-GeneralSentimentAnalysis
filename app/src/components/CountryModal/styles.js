import styled from "styled-components";

const CountryModalStyles = styled.div`
  .modalContainer {
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;

    .modal {
      max-height: 70vh;
      width: 40vw;
      border-radius: 15px;
      padding: 30px;
      box-sizing: border-box;
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
      border: 1px solid #dde3e8;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      position: relative;

      .cancel {
        position: absolute;
        top: 10px;
        right: 15px;
        height: 20px;
        cursor: pointer;
      }

      .modalTitle {
        font-size: 20px;
        color: #47535e;
        margin-bottom: 15px;
        font-weight: 600;
      }

      .modalSubtitle {
        margin-bottom: 30px;
        display: flex;
        align-items: center;

        .abbBox {
          border-radius: 5px;
          background-color: #f1f9ff;
          padding: 5px 10px;
          margin-right: 7px;
          font-size: 13px;
          font-weight: 600;
          color: #2394f9;
          border: 1px solid #2394f9;
        }
      }

      .countryList {
        border-radius: 5px;
        border: 1px solid #dde3e8;
        flex: 1;
        overflow-y: auto;

        ::-webkit-scrollbar {
          width: 5px !important;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: #bcbcbc !important;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #888 !important;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555 !important;
        }

        .countryName {
          color: #8b91a3;
          font-weight: 600;
          font-size: 15px;
          box-sizing: border-box;
          padding: 4px 10px;

          &:hover {
            background-color: #f1f9ff;
            color: #0886f7;
          }
        }
      }
    }
  }
`;

export default CountryModalStyles;
