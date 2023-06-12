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
      width: 75vw;
      border-radius: 15px;
      padding: 30px;
      box-sizing: border-box;
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
      border: 1px solid #dde3e8;
      background-color: #FFFFFF;
      display: flex;
      flex-direction: column;
      position: relative;
      background-image: url('https://i.ibb.co/bsBz6j4/team2.jpg');
      background-repeat: no-repeat;
      background-position: bottom right;
      background-size: 30% auto;

      .cancel {
        position: absolute;
        top: 10px;
        right: 15px;
        height: 20px;
        cursor: pointer;
      }

      .modalTitle {
        font-size: 30px;
        color: #000;
        margin-bottom: 30px;
        font-weight: 600;
        text-align: center;
      }

      .teamContainer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .teamMember {
          margin: 15px 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .memberPic {
            height: 20vh;
            border-radius: 50%;
            margin-bottom: 10px;
            border: 4px solid #2097F4;
          }
          .details {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;

            .fullName{
              color: rgb(16, 16, 16);
              font-size: 14px;
            }
            .studentId{
              color: #BEBEBE;
              font-size: 12px;
            }
            .location{
              color: #BEBEBE;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
`;

export default CountryModalStyles;
