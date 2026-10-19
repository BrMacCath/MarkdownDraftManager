"use strict";
// Tests to ensure frontmatter functions are working.
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
const assert = __importStar(require("assert"));
const removeFrontMatter_1 = require("../functions/frontmatter/removeFrontMatter");
const frontMatterConstants_1 = require("../constants/frontMatterConstants");
// Tests how it removes frontmatter. Here is some test data
suite('Test frontmatter functions', () => {
    const testFrontmatter = "---\ntest: Blah\n---\n";
    const testContent = "This is test content. This is here";
    test("Removes frontmatter", () => {
        const testText = testFrontmatter + testContent;
        assert.strictEqual((0, removeFrontMatter_1.removeFrontMatter)(testText), testContent);
    });
    test("Does nothing", () => {
        assert.strictEqual((0, removeFrontMatter_1.removeFrontMatter)(testContent), testContent);
    });
    test("Without an end Indicator it should stay the same", () => {
        const testText = frontMatterConstants_1.frontMatterIndicator + testContent;
        assert.strictEqual((0, removeFrontMatter_1.removeFrontMatter)(testText), testText);
    });
});
//# sourceMappingURL=frontmatterFunctions.test.js.map