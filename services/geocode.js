const request = require("request");
const axios = require("axios");

let currentLocation = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: "http://ipinfo.io",
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Cannot find the current location");
        } else {
          result = {
            address: body.org,
            latitude: body.loc.split(",")[0].trim(),
            longitude: body.loc.split(",")[1].trim()
          };
          resolve(result);
        }
      }
    );
  });
};

let geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect to google service");
        } else if (body.status === "ZERO_RESULTS") {
          reject("Unable to find the address");
        } else if (body.status === "OK") {
          result = {
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          };
          resolve(result);
        }
      }
    );
  });
};

let getAddress = param => (param ? geocodeAddress(param) : currentLocation());

module.exports = {
  getAddress
};
