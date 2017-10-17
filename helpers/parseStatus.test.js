const parseStatus = require("./parseStatus");

const deliveredResult = {
  action: "Delivered - awesome"
};

const notDeliveredResult = {
  action: "Picked Up"
};

describe("parseStatus ", () => {
  it("returns a delivered true object when action starts with 'Delivered'", () => {
    expect(parseStatus(deliveredResult)).toEqual({
      delivered: true,
      status: "Delivered"
    });
  });

  it("returns a delivered false object when action does not start with 'Delivered'", () => {
    expect(parseStatus(notDeliveredResult)).toEqual({
      delivered: false,
      status: "Picked Up"
    });
  });
});
