const path = require("path");

module.exports = {
  entry: [
  "./js/util.js",
  "./js/load.js",
  "./js/map.js",
  "./js/data.js",
  "./js/pin.js",
  "./js/card.js",
  "./js/form.js",
  "./js/filter.js",
  "./js/main.js",
  "./js/images.js"
],
output: {
  filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
devtool: false
};
