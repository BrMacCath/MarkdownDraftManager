// The checks from
import * as vscode from 'vscode';
import * as assert from 'assert';
import { updateFrontmatter } from '../functions/frontmatter/updateFrontmatter';

suite('Create draft function checks',()=>{


    test("Frontmatter changed correctly",async()=>{
        const doc = await vscode.workspace.openTextDocument({
            language: 'markdown',
            content: '---\ndraftNum: 3\n---\nBody text',
        });
        await vscode.window.showTextDocument(doc);
        
        const secondDraft = updateFrontmatter();
        console.log("secondDraft: "+ secondDraft);
        assert.ok(secondDraft.includes('draftNum: 4'));
        assert.ok(secondDraft.includes('completeSection: ## Complete Third Draft') );
        assert.ok(secondDraft.includes('testProperty: here'));
    });

});