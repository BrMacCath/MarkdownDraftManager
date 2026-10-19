"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFrontMatter = extractFrontMatter;
const frontMatterConstants_1 = require("../../constants/frontMatterConstants");
// FrontMatterExtractor
// Extract frontmatter with checks if things aren't working.
function extractFrontMatter(content) {
    const keepGoing = content.indexOf(frontMatterConstants_1.frontMatterEndIndicator) > -1;
    let foundFrontmatter = false;
    let complete = false;
    let draftNum = -1;
    // Is there frontmatter?
    if (!keepGoing) {
        return [foundFrontmatter, complete, draftNum];
    }
    foundFrontmatter = true;
    const newLine = "\n";
    const frontmatterSplit = content.slice(0, content.indexOf(frontMatterConstants_1.frontMatterEndIndicator))
        .split(newLine)
        .flatMap((line) => {
        return line.trim();
    })
        .slice(1);
    let key = [];
    let value = [];
    frontmatterSplit.forEach((line) => {
        const separatorSignifier = ":";
        const keyVal = line.split(separatorSignifier);
        key.push(keyVal[0].trim());
        value.push(keyVal[1].trim());
    });
    // Is there complete status?;
    const completeKey = "complete";
    const completeIndex = key.indexOf(completeKey);
    if (completeIndex > -1) {
        complete = value[completeIndex].trim() === "true" ? true : false;
    }
    if (complete) {
        return [foundFrontmatter, complete, draftNum];
    }
    ;
    const draftKey = "draftNum";
    const draftNumIndex = key.indexOf(draftKey);
    if (draftNumIndex === -1) {
        return [foundFrontmatter, complete, draftNum];
    }
    draftNum = Number(value[draftNumIndex]);
    return [foundFrontmatter, complete, draftNum];
}
//# sourceMappingURL=extractFrontMatter.js.map