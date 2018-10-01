import { getPlatformInfo } from "./platforminfo";

describe("getPlatformInfo", () => {
    test("should return default value if chrome api is not available", async () => {
        const result = await getPlatformInfo();
        expect(result).toEqual({ "arch": "x86-64", "nacl_arch": "x86-64", "os": "dev" });
    });
    
    test("should return actual platform info", async () => {
        (global as any).chrome = {
            runtime: {
                getPlatformInfo: jest.fn(cb => cb({ "arch": "custom", "os": "test" })),
            }
        };
        const result = await getPlatformInfo();
        expect(result).toEqual({ "arch": "custom", "os": "test" });
    });
});
