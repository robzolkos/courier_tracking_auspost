const request = require("request");
const courier_finder = require("courier_finder");

const normalize = require("./helpers/normalize");

function fetcher(api_key, connote, cb) {
  const check_validity = courier_finder(connote);

  if (check_validity.courier != "Australia Post") {
    if (connote == undefined) {
      connote = "Not provided";
    }
    return cb({
      connote: connote,
      statusCode: 500,
      message: { error: "Invalid Australia Post connote" }
    });
  }

  const url = "https://digitalapi.auspost.com.au/track/v3/search?q=";

  request.get(
    {
      url: url + connote,
      headers: {
        Authorization: "Basic " + api_key
      }
    },
    (error, response, body) => {
      try {
        response_body = JSON.parse(body);
      } catch (e) {
        return cb({
          connote: connote,
          statusCode: 500,
          message: "Error in reponse from Australia Post"
        });
      }

      if (
        response_body.QueryTrackEventsResponse.TrackingResults[0].ReturnMessage
          .Description === "Item Does not Exists"
      ) {
        return cb({
          connote: connote,
          statusCode: 404,
          message: "No scans found"
        });
      }

      if (response.statusCode === 200) {
        return cb(null, normalize(response_body));
      }

      return cb({
        connote: connote,
        statusCode: response.statusCode,
        message: response_body
      });
    }
  );
}

module.exports = fetcher;
