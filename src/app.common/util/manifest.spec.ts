import { getManifest } from "./manifest";

describe("getManifest", () => {
    test("should return default value if chrome api is not available", async () => {
        const result = await getManifest();
        expect(result).toEqual({ version: "dev" });
    });
    
    test("should return actual manifest", async () => {
        (global as any).chrome = {
            runtime: {
                getManifest: jest.fn().mockResolvedValue({ version: "test" }),
            }
        };
        const result = await getManifest();
        expect(result).toEqual({ version: "test" });
    });
});
