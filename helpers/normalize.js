const uniqWith = require("lodash.uniqwith");
const isEqual = require("lodash.isequal");

const parseStatus = require("./parseStatus");
const formatDate = require("./formatDate");
const courier_finder = require("courier_finder");

function get_connote(res) {
  try {
    const connote = res.QueryTrackEventsResponse.TrackingResults[0].TrackingID;
    return connote;
  } catch (e) {
    return "Unknown";
  }
}

function _compareDate(a, b) {
  let comparison = 0;

  if (a.value > b.value) {
    comparison = -1;
  } else if (a.value < b.value) {
    comparison = 1;
  }

  return comparison;
}

function locationString(location) {
  if (location && location.length > 0) {
    return location;
  }
  return null;
}

function transform(res) {
  let trackingInfo = [];
  let pickedupAt = null;
  let pickedUp = false;
  let image_url = null;
  let signature = null;

  res.QueryTrackEventsResponse.TrackingResults[0].Consignment.Articles[0].Events.forEach(
    coupon => {
      let isoDate = formatDate(coupon.EventDateTime);

      let h = {
        date: isoDate.date,
        time: isoDate.time,
        value: isoDate.value,
        action: coupon.EventDescription.trim(),
        location: locationString(coupon.Location)
      };

      trackingInfo.push(h);
      trackingInfo.sort(_compareDate);
    }
  );

  trackingInfo = uniqWith(trackingInfo, isEqual);

  if (trackingInfo.length > 0) {
    const firstScan = trackingInfo[trackingInfo.length - 1];
    pickedupAt = { date: firstScan.date, time: firstScan.time };
    pickedUp = true;
  }

  let st = parseStatus(trackingInfo[0]);

  let delivered = st.delivered;
  let deliveredAt = null;
  if (delivered) {
    ob = trackingInfo[0];
    deliveredAt = { date: ob.date, time: ob.time };
  }

  trackingInfo.forEach(function(v) {
    delete v.value;
  });

  let r = {
    connote: get_connote(res),
    statusCode: 200,
    courier: "Australia Post",
    status: st.status,
    pickedUp: pickedUp,
    pickedupAt: pickedupAt,
    delivered: delivered,
    deliveredAt: deliveredAt,
    signature: signature,
    trackingLink: courier_finder(get_connote(res)).tracking_link,
    activity: trackingInfo
  };

  return r;
}

module.exports = transform;
