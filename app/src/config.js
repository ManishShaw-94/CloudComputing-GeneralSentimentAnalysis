const axios = require("axios").default;

const instance = axios.create({
  baseURL:
    window && window.location && window.location.origin
      ? window.location.origin
      : "http://localhost:7000",
  timeout: 100000,
});

export default instance;
