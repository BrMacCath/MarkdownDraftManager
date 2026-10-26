"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode6 = __toESM(require("vscode"));

// src/functions/frontmatter/updateFrontmatter.ts
var vscode = __toESM(require("vscode"));
function updateFrontmatter(frontmatter) {
  const draftNumIndicator = vscode.workspace.getConfiguration("myExtension").get("frontmatter.draftNumIndicator", "draftNum");
  const draftInd = frontmatter.indexOf(draftNumIndicator);
  if (draftInd === -1) {
    vscode.window.showInformationMessage("This file does not contain the frontmatter to indicate the draft number.");
  }
  let tempFile = frontmatter.slice(draftInd + draftNumIndicator.length + 1);
  const endLineInd = tempFile.indexOf("\n");
  const draftNum = Number(tempFile.slice(0, endLineInd).trim());
  const newDraftNum = draftNum + 1;
  frontmatter = frontmatter.replace(draftNumIndicator + ": " + draftNum, draftNumIndicator + ": " + newDraftNum);
  return [frontmatter, draftNum];
}

// src/functions/paragraphs/splitParagraphsFrontMatter.ts
var vscode2 = __toESM(require("vscode"));
function splitParagraphsFrontMatter(paragraphs, rewriteLineSignifier, topicFrontMatterSeparator) {
  let splitParagraph = [];
  paragraphs.forEach((paragraph) => {
    const temp = paragraph.split(topicFrontMatterSeparator);
    if (temp.length !== 2) {
      vscode2.window.showInformationMessage("Something has gone wrong. Length is " + temp.length);
    }
    const paraContent = temp[1].split("\n").filter((t) => {
      return t[0] === rewriteLineSignifier;
    }).map((t) => {
      return t.slice(1).trim();
    });
    splitParagraph.push([temp[0].trim(), paraContent]);
  });
  return splitParagraph;
}

// src/functions/paragraphs/splitParagraphsNoFrontMatter.ts
function splitParagraphsNoFrontMatter(paragraphs, rewriteLineSignifier) {
  let splitParagraph = [];
  paragraphs.forEach((paragraph) => {
    const paraContent = paragraph.split("\n").filter((t) => {
      return t[0] === rewriteLineSignifier;
    }).map((t) => {
      return t.slice(1).trim();
    });
    splitParagraph.push(["", paraContent]);
  });
  return splitParagraph;
}

// src/functions/drafts/stringifyNumber.ts
var special = [
  "Zeroth",
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
  "Eleventh",
  "Twelfth",
  "Thirteenth",
  "Fourteenth",
  "Fifteenth",
  "Sixteenth",
  "Seventeenth",
  "Eighteenth",
  "Nineteenth"
];
var deca = [
  "twent",
  "thirt",
  "fort",
  "fift",
  "sixt",
  "sevent",
  "eight",
  "ninet"
];
function stringifyNumber(n) {
  if (n < 20) {
    return special[n];
  }
  if (n % 10 === 0) {
    return deca[Math.floor(n / 10) - 2] + "ieth";
  }
  return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
}

// src/functions/drafts/createDraftTitle.ts
function createDraftTitle(draftNum) {
  return "## Complete " + stringifyNumber(draftNum) + " Draft";
}

// src/functions/drafts/createFromDraft.ts
var vscode3 = __toESM(require("vscode"));
function createFromDraft(draft, oldDraftNum) {
  const config = vscode3.workspace.getConfiguration("myExtension");
  const paragraphSeparator = config.get("draftStyle.paragraphSeparator", "+---+");
  const topicFrontMatterSeparator = config.get("draftStyle.topicFrontmatterSeparator", "*---*");
  const haveTopicFrontMatter = config.get("draftStyle.haveTopicFrontmatterSeparator", true);
  const rewriteLineSignifier = config.get("draftStyle.rewriteLineSignifier", ">");
  const commentLineSignifier = config.get("draftStyle.commentSignifier");
  const newLineSeperator = "\n" + commentLineSignifier + " \n" + rewriteLineSignifier + " \n\n";
  const currentDraftTitle = createDraftTitle(oldDraftNum);
  const contentIndex = draft.indexOf(currentDraftTitle) + currentDraftTitle.length;
  const contentDraft = draft.slice(contentIndex);
  let paragraphs = contentDraft.split(paragraphSeparator);
  let splitParagraph = [];
  if (!haveTopicFrontMatter) {
    splitParagraph = splitParagraphsNoFrontMatter(paragraphs, rewriteLineSignifier);
  } else {
    splitParagraph = splitParagraphsFrontMatter(paragraphs, rewriteLineSignifier, topicFrontMatterSeparator);
  }
  let completeDraft = [];
  let newDraft = [];
  splitParagraph.forEach((content) => {
    const sentences = content[1].map((t) => t.replace(".", ""));
    completeDraft.push(sentences.join(". ") + ".");
  });
  if (!haveTopicFrontMatter) {
    splitParagraph.forEach((content) => {
      const sentences = content[1].map((t) => t.replace(".", ""));
      newDraft.push("\n" + sentences.join(newLineSeperator) + newLineSeperator);
    });
  } else {
    splitParagraph.forEach((content) => {
      const topicFrontMatter = content[0].trim();
      const sentences = content[1].map((t) => {
        return t.replace(".", "");
      });
      newDraft.push(topicFrontMatter + "\n\n" + topicFrontMatterSeparator + "\n" + sentences.join(newLineSeperator) + newLineSeperator);
    });
  }
  let newContent = "";
  newContent += `

## Complete ${stringifyNumber(oldDraftNum)} Draft

` + completeDraft.join("\n\n") + "\n\n";
  newContent += `# ${stringifyNumber(oldDraftNum + 1)} Draft

` + newDraft.join(paragraphSeparator + "\n");
  return newContent;
}

// src/functions/drafts/createFromFirstDraft.ts
var vscode4 = __toESM(require("vscode"));
function createFromFirstDraft(draft) {
  const config = vscode4.workspace.getConfiguration("myExtension");
  const paragraphSeparator = config.get("draftStyle.paragraphSeparator", "+---+");
  const topicFrontMatterSeparator = config.get("draftStyle.topicFrontmatterSeparator", "*---*");
  const haveTopicFrontMatter = config.get("draftStyle.haveTopicFrontmatterSeparator", true);
  const rewriteLineSignifier = config.get("draftStyle.rewriteLineSignifier", ">");
  const commentLineSignifier = config.get("draftStyle.commentSignifier");
  const newLineSeperator = "\n" + commentLineSignifier + " \n" + rewriteLineSignifier + " \n\n";
  let paragraphs = draft.split(paragraphSeparator);
  let splitParagraph = [];
  if (!haveTopicFrontMatter) {
    paragraphs.forEach((paragraph) => {
      const paraContent = paragraph.split(".");
      splitParagraph.push(["", paraContent]);
    });
  } else {
    paragraphs.forEach((paragraph) => {
      const temp = paragraph.split(topicFrontMatterSeparator);
      if (temp.length !== 2) {
        vscode4.window.showInformationMessage("Something has gone wrong. Length is " + temp.length);
      }
      const paraContent = temp[1].split(".");
      splitParagraph.push([temp[0], paraContent]);
    });
  }
  let completeDraft = [];
  let newDraft = [];
  splitParagraph.forEach((content) => {
    const sentences = content[1].filter((t) => {
      return t.trim() !== "";
    });
    completeDraft.push(sentences.join(".") + ".");
  });
  if (!haveTopicFrontMatter) {
    splitParagraph.forEach((content) => {
      const sentences = content[1].filter((t) => {
        t.trim() !== "";
      });
      newDraft.push(sentences.join(newLineSeperator) + newLineSeperator);
    });
  } else {
    splitParagraph.forEach((content) => {
      const topicFrontMatter = content[0];
      const sentences = content[1].filter((t) => {
        return t.trim() !== "";
      });
      newDraft.push(topicFrontMatter + topicFrontMatterSeparator + sentences.join(newLineSeperator) + newLineSeperator);
    });
  }
  let newContent = "";
  newContent += "\n\n## Complete First Draft\n\n" + completeDraft.join("\n\n") + "\n\n";
  newContent += "# Second Draft\n\n" + newDraft.join(paragraphSeparator);
  draft += newContent;
  return draft;
}

// src/functions/drafts/splitContent.ts
var vscode5 = __toESM(require("vscode"));

// src/constants/frontMatterConstants.ts
var frontMatterIndicator = "---";
var frontMatterEndIndicator = "\n---\n";

// src/functions/drafts/splitContent.ts
function splitContent(text) {
  const start_file = text.slice(0, 3);
  if (frontMatterIndicator !== start_file) {
    vscode5.window.showInformationMessage("Front matter is missing");
    return ["", ""];
  }
  const index = text.indexOf(frontMatterEndIndicator) + frontMatterEndIndicator.length;
  const frontMatter = text.slice(0, index);
  const content = text.slice(index);
  return [frontMatter, content];
}

// src/functions/drafts/createDraft.ts
function createDraft(fileText) {
  let [tempFrontMatter, content] = splitContent(fileText);
  let [frontMatter, oldDraftNum] = updateFrontmatter(tempFrontMatter);
  const updatedContent = oldDraftNum === 1 ? createFromFirstDraft(content) : createFromDraft(content, oldDraftNum);
  const updatedFile = frontMatter + updatedContent;
  return updatedFile;
}

// src/extension.ts
function activate(context) {
  const updateDraftCommand = vscode6.commands.registerCommand("markdown-draft-manager.updateMarkdownDraft", async () => {
    const editor = vscode6.window.activeTextEditor;
    if (!editor) {
      vscode6.window.showWarningMessage("No file is currently open.");
      return;
    }
    const document = editor.document;
    if (document.languageId !== "markdown") {
      vscode6.window.showInformationMessage("The current file is not markdown.");
      return;
    }
    const newte = createDraft(document.getText());
    console.log(newte);
    const fullRange = new vscode6.Range(
      document.positionAt(0),
      document.positionAt(document.getText().length)
    );
    const success = await editor.edit((editBuilder) => {
    });
    if (!success) {
      vscode6.window.showErrorMessage("Failed to edit the document.");
    }
  });
  context.subscriptions.push(updateDraftCommand);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
