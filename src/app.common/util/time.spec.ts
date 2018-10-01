const momentActual = require.requireActual("moment-timezone");

import moment = require("moment-timezone");
import { Moment } from "moment-timezone";

import { formatTime, fromatOffset, formatDate, getTimeZoneAbbreviation } from "./time";

jest.mock("moment-timezone", () => {
    const momentMock: any = () => {
        return momentActual.utc("2018-06-30T16:12:39-07:00");
    };
    momentMock.tz = momentActual.tz;
    return momentMock;
});

describe("formatTime", () => {
    let time: Moment;

    beforeEach(() => {
        time = moment();
    });

    test("should format time in am/pm format", () => {
        const result = formatTime(time, false);
        expect(result).toBe("11:12pm");
    });

    test("should format time with seconds in am/pm format", () => {
        const result = formatTime(time, false, true);
        expect(result).toBe("11:12:39pm");
    });

    test("should format time in 24 hours format", () => {
        const result = formatTime(time, true, false);
        expect(result).toBe("23:12");
    });

    test("should format time with seconds in 24 hours format", () => {
        const result = formatTime(time, true, true);
        expect(result).toBe("23:12:39");
    });
});

describe("fromatOffset", () => {
    const testCases = [
        { input: 0, expected: "+00:00" },
        { input: 43, expected: "+00:43" },
        { input: 243, expected: "+04:03" },
        { input: 12243, expected: "+204:03" },
        { input: -43, expected: "-00:43" },
        { input: -443, expected: "-07:23" },
        { input: -412343, expected: "-6872:23" },
    ];

    testCases.forEach(testCase => {
        test(`should format "${testCase.input}" offset`, () => {
            const result = fromatOffset(testCase.input)
            expect(result).toBe(testCase.expected);
        });
    });
});

describe("formatDate", () => {
    test("should format date", () => {
        const result = formatDate(23, 4);
        expect(result).toBe("Jul 23");
    });
});

describe("getTimeZoneAbbreviation", () => {
    test("should format date", () => {
        const result = getTimeZoneAbbreviation("America/Vancouver");
        expect(result).toBe("PST");
    });
});
