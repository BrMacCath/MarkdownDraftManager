"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createDraft;
const updateFrontmatter_1 = require("../frontmatter/updateFrontmatter");
const createFromDraft_1 = require("./createFromDraft");
const createFromFirstDraft_1 = require("./createFromFirstDraft");
const splitContent_1 = require("./splitContent");
// This creates a new draft.
// The method to create a new draft differs from a first
// draft to the rest so those are isolated apart.
function createDraft(fileText) {
    let [tempFrontMatter, content] = (0, splitContent_1.splitContent)(fileText);
    let [frontMatter, oldDraftNum] = (0, updateFrontmatter_1.updateFrontmatter)(tempFrontMatter);
    const updatedContent = oldDraftNum === 1 ?
        (0, createFromFirstDraft_1.createFromFirstDraft)(content) : (0, createFromDraft_1.createFromDraft)(content, oldDraftNum);
    const updatedFile = frontMatter + updatedContent;
    return updatedFile;
}
//# sourceMappingURL=createDraft.js.map