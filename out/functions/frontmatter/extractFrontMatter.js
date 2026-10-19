"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFrontMatter = extractFrontMatter;
const frontMatterConstants_1 = require("../../constants/frontMatterConstants");
// FrontMatterExtractor
// Extract frontmatter with checks if it is not found.
// Could this be a maybe type?
function extractFrontMatter(content) {
    const keepGoing = content.indexOf(frontMatterConstants_1.frontMatterEndIndicator) > -1;
    let foundFrontmatter = false;
    const newLine = "\n";
    // Is there frontmatter?
    if (!keepGoing) {
        return [foundFrontmatter, []];
    }
    foundFrontmatter = true;
    const frontmatterSplit = content.slice(frontMatterConstants_1.frontMatterIndicator.length, content.indexOf(frontMatterConstants_1.frontMatterEndIndicator))
        .split(newLine)
        .flatMap((line) => {
        return line.trim();
    })
        .slice(1);
    let frontMatterProperties = [];
    frontmatterSplit
        .map((line) => line.split(":"))
        .filter((keyVal) => keyVal.length === 2)
        .forEach(([key, value]) => {
        frontMatterProperties.push([key.trim(), value.trim()]);
    });
    return [foundFrontmatter, frontMatterProperties];
}
//# sourceMappingURL=extractFrontMatter.js.map