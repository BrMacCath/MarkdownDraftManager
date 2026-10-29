"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitParagraphsFrontMatter = splitParagraphsFrontMatter;
function splitParagraphsFrontMatter(paragraphs, rewriteLineSignifier, topicFrontMatterSeparator) {
    let splitParagraph = [];
    paragraphs
        .filter((t) => t.length === 2)
        .forEach((paragraph) => {
        const temp = paragraph.split(topicFrontMatterSeparator);
        const paraContent = temp[1].split("\n").filter((t) => {
            return t[0] === rewriteLineSignifier;
        }).map(t => {
            return t.slice(1).trim();
        });
        splitParagraph.push([temp[0].trim(), paraContent]);
    });
    return splitParagraph;
}
//# sourceMappingURL=splitParagraphsFrontMatter.js.map