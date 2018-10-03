import { getMatches } from "./match";

describe("getMatches", () => {
    const testCases = [
        { text: "some text", query: "tex", expectedMatchIndices: [[5, 8]] },
        { text: "some TeXt", query: "tEx", expectedMatchIndices: [[5, 8]] },
        { text: "some TeXt", query: "t", expectedMatchIndices: [[5, 6], [8, 9]] },
        { text: "", query: "t", expectedMatchIndices: [] },
        { text: "some text", query: "", expectedMatchIndices: [] },
        { text: "some. text.", query: ".", expectedMatchIndices: [[4, 5], [10, 11]] },
        { text: "\\. text.", query: "\\", expectedMatchIndices: [[0, 1]] },
        { text: "some text", query: "-", expectedMatchIndices: [] },
    ];

    testCases.forEach(({ text, query, expectedMatchIndices }) => {
        test(`should match quey "${query}" in text "${text}"`, () => {
            const result = getMatches(text, query);
            expect(result).toEqual(expectedMatchIndices);
        });
    });
});
