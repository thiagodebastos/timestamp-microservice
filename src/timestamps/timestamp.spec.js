import { makeTimestamp } from "./";

describe("Timestamp generator", () => {
  it("should handle a valid date, and return the correct unix timestamp", () => {
    const dates = [
      "02/13/2020",
      "1/2/2020",
      "2015-12-15",
      "2013-05-10T05:04:10.40"
    ];

    const expected = [
      1581512400000,
      1577883600000,
      1450137600000,
      1368126250000
    ];

    const actual = dates.map(date => makeTimestamp(date).unix);

    expect(actual).toStrictEqual(expected);
  });

  it("should handle a valid date, and return the correct UTC string", () => {
    const dates = [
      "02/13/2020",
      "1/2/2020",
      "2015-12-15",
      "2013-05-10T05:04:10.40"
    ];

    const expected = [
      "Wed, 12 Feb 2020 13:00:00 GMT",
      "Wed, 01 Jan 2020 13:00:00 GMT",
      "Tue, 15 Dec 2015 00:00:00 GMT",
      "Thu, 09 May 2013 19:04:10 GMT"
    ];

    const actual = dates.map(date => makeTimestamp(date).natural);

    expect(actual).toStrictEqual(expected);
  });

  it("should handle a valid unix date, and return the correct unix timestamp", () => {
    const validUnixDate = "2020-01-31T19:44:00+00:00";
    const actual = makeTimestamp(validUnixDate).unix;
    const expected = 1580499840000;
    expect(actual).toStrictEqual(expected);
  });

  it("should return the expected error message for an invalid date", () => {});

  it("should handle an empty date parameter, and return the current time in unix format", () => {
    const actual = makeTimestamp();
    expect(Date.parse(actual.natural)).toBeTruthy();
  });

  it("should handle an empty date parameter, and return the current time in UTC format", () => {
    const actual = makeTimestamp();
    expect(new Date(actual.unix)).toBeTruthy();
  });
});
