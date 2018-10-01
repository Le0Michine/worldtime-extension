import { getBuildTarget } from "./target";

describe("getBuildTarget", () => {
    test("should return undefined by default", () => {
        const result = getBuildTarget();
        expect(result).toBe(undefined);
    });

    test("should return specified target", () => {
        process.env.TARGET = "target-1"
        const result = getBuildTarget();
        expect(result).toBe("target-1");
    });
});
