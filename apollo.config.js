module.exports = {
  client: {
    includes: ["./src/**/*.js"],
    service: {
      name: "splitlunch",
      url: "http://localhost:4000/graphql",
      skipSSLValidation: true
    }
  }
};
