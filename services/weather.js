const request = require("request");

// 6e52984c5eec5532f0063d17348128aa
// https://api.darksky.net/forecast/6e52984c5eec5532f0063d17348128aa/37.8267,-122.4233

const API_KEY = "6e52984c5eec5532f0063d17348128aa";

let getTemperature = options => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://api.darksky.net/forecast/${API_KEY}/${options.latitude},${options.longitude}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect to server");
        } else if (response.statusCode === 200) {
          result = {
            temperature: (body.currently.temperature - 32) * (5 / 9),
            apparentTemperature:
              (body.currently.apparentTemperature - 32) * (5 / 9),
            summary: body.currently.summary
          };
          resolve(result);
        } else {
          reject(body.error);
        }
      }
    );
  });
};

module.exports = {
  getTemperature
};
