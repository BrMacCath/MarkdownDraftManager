"use strict";
// First Draft properties to check
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
// Topic Frontmatter effects
// Change in draft num
// Change in completeSectionIndicator
const assert = __importStar(require("assert"));
const createFromFirstDraft_1 = require("../functions/drafts/createFromFirstDraft");
suite('First Draft Create function checks', () => {
    test('Frontmatter created correctly', async () => {
        const content = 'Body text';
        const secondDraft = (0, createFromFirstDraft_1.createFromFirstDraft)(content);
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: ## Complete Second Draft'));
    });
    test("Frontmatter changed correctly", () => {
        const content = '---\nrevision: 1\n---\nBody text';
        const secondDraft = (0, createFromFirstDraft_1.createFromFirstDraft)(content);
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: ## Complete Second Draft'));
    });
});
//# sourceMappingURL=createFromFirstDraft.test.js.map