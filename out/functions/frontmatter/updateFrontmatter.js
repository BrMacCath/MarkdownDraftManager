"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFrontmatter = updateFrontmatter;
const vscode = __importStar(require("vscode"));
function updateFrontmatter(frontmatter) {
    const draftNumIndicator = vscode.workspace.getConfiguration('myExtension').get('frontmatter.draftNumIndicator', "draftNum");
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
//# sourceMappingURL=updateFrontmatter.js.map