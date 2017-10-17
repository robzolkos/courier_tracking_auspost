const formatDate = require("./formatDate");

describe("formatDate", () => {
  it("returns a date", () => {
    expect(formatDate("2017-09-25T14:44:30+10:00")).toEqual({
      date: "Sep 25, 2017",
      time: "2:44pm",
      value: 1506314670000
    });
  });
});
