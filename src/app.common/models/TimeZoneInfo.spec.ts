import { createTimeZoneInfo, getHoursWithOffset, getOffset, getRelativeOffset } from "./TimeZoneInfo";

const momentActual = require.requireActual("moment-timezone");

jest.mock("moment-timezone", () => {
    const momentMock: any = () => {
        return {
            ...momentActual("2018-06-30T16:12:39-00:00"),
            utcOffset: () => 150,
            tz: momentActual.tz,
        };
    };
    return momentMock;
});

describe("createTimeZoneInfo", () => {
    test("should create time zone info", () => {
        const result = createTimeZoneInfo("tz1", "new zone", 42);
        expect(result).toEqual({ name: "new zone", timeLineid: 42, timeZoneId: "tz1" });
    });

    test("should create time zone info with default time line id", () => {
        const result = createTimeZoneInfo("tz1", "new zone");
        expect(result).toEqual({ name: "new zone", timeLineid: 1, timeZoneId: "tz1" });
    });
});

describe("getHoursWithOffset", () => {
    test("should return array of hours shifted by hours offset relative to today", () => {
        const result = getHoursWithOffset(1);
        expect(result[0]).toEqual({ dayOffset: -1, hour: 21 });
        expect(result.length).toEqual(24);
    });
});

describe("getOffset", () => {
    test("should return correct tz offset for a timeline object", () => {
        const result = getOffset({ name: "", timeLineid: 32, timeZoneId: "Europe/Warsaw" });
        expect(result).toEqual(120);
    });
});

describe("getRelativeOffset", () => {
    test("should return tz offset relative to the client one", () => {
        const result = getRelativeOffset({ name: "", timeLineid: 32, timeZoneId: "Europe/Warsaw" });
        expect(result).toEqual(-30);
    });
});
