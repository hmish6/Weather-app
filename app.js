const yargs = require("yargs");
const fs = require("fs");

const geocode = require("./services/geocode");
const weather = require("./services/weather");

const argv = yargs
  .options({
    address: {
      demand: false,
      alias: "a",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

let weatherReport = () => {
  let address;
  geocode
    .getAddress(argv.address)
    .then(result => {
      address = result.address;
      return weather.getTemperature(result);
    })
    .then(weather => {
      data = `Temperature in ${address} is ${weather.temperature}° celsius and feels like is ${weather.apparentTemperature}° celsius. It is predicted to be ${weather.summary}`;
      fs.writeFileSync("weather-report.txt", data);
    })
    .catch(errorMessage => {
      console.log(errorMessage);
    });
};

weatherReport();
