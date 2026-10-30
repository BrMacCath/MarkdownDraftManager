import * as assert from "assert";
import { splitParagraphsNoFrontMatter } from "../functions/paragraphs/splitParagraphsNoFrontMatter";

suite("splitParagraphsNoFrontMatter", () => {
    test("keeps only lines starting with the signifier, stripped and trimmed", () => {
        const result = splitParagraphsNoFrontMatter(
            ["# keep me\nignore me\n#   also keep"],
            "#"
        );
        assert.deepStrictEqual(result, [["", ["keep me", "also keep"]]]);
    });

    test("returns an empty list for paragraphs with no matching lines", () => {
        const result = splitParagraphsNoFrontMatter(["nothing here"], "#");
        assert.deepStrictEqual(result, [["", []]]);
    });

    test("handles multiple paragraphs independently", () => {
        const result = splitParagraphsNoFrontMatter(["#a", "#b\n#c"], "#");
        assert.deepStrictEqual(result, [["", ["a"]], ["", ["b", "c"]]]);
    });

    test("handles an empty input array", () => {
        assert.deepStrictEqual(splitParagraphsNoFrontMatter([], "#"), []);
    });
});