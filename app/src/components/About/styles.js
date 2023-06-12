import styled from "styled-components";

const AboutStyles = styled.div`
  background-image: url("https://i.ibb.co/nkGBjZ8/GA001981.jpg");
  background-size: 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
  height: 100vh;

  .aboutContainer {
    background: radial-gradient(white 15%, transparent);
    padding: 20%;
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-weight: 600;
      margin-bottom: 30px;
      font-size: 20px;
    }
    .description {
      text-align: center;
      font-size: 15px;
      margin-bottom: 20px;
    }
    .scope {
      text-align: center;
      font-size: 15px;
    }
  }
`;

export default AboutStyles;
