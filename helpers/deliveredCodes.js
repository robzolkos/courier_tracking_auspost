// list of valid delivered codes that means a package has actually been delivered (instead of say Delivered but given to a 3rd party)

const deliveredCodes = [
  "YES",
  "SIG",
  "PCY",
  "ATL",
  "R36",
  "R34",
  "R35",
  "LAI",
  "NEI",
  "PRS"
];

module.exports = deliveredCodes;
