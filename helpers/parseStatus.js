const deliveredCodes = require("./deliveredCodes");

function parseStatus(status) {
  let statusText = status.action;
  let delivered = false;
  let deliveredText = status.action;

  if (statusText.indexOf("Delivered") === 0) {
    delivered = true;
    deliveredText = "Delivered";
  }

  return {
    status: deliveredText,
    delivered: delivered
  };
}

module.exports = parseStatus;
