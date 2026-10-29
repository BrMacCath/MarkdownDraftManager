// First Draft properties to check

// Topic Frontmatter effects

// Change in draft num

// Change in completeSectionIndicator

import * as assert from 'assert';
import createDraft from '../functions/drafts/createDraft';
import { updateFrontmatter } from '../functions/frontmatter/updateFrontmatter';
import * as vscode from 'vscode';



suite('First Draft Create function checks',()=>{
    test('Frontmatter created correctly',async ()=>{
        // const doc = await vscode.workspace.openTextDocument({
        //     language: 'markdown',
        //     content: '---\ndraftNum: 1\n---\nBody text',
        // });
        // await vscode.window.showTextDocument(doc);
        
        // const secondDraft = updateFrontmatter();
        // assert.ok(secondDraft.includes('draftNum: 2'));
        // assert.ok(secondDraft.includes('completeSection: ## Complete First Draft') );
        // assert.ok(secondDraft.includes('testProperty: here'));
    });

    test("Frontmatter changed correctly",async()=>{
        const doc = await vscode.workspace.openTextDocument({
            language: 'markdown',
            content: '---\ndraftNum: 1\n---\nBody text',
        });
        await vscode.window.showTextDocument(doc);
        
        const secondDraft = updateFrontmatter();
        console.log("secondDraft: "+ secondDraft);
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: ## Complete First Draft') );
        assert.ok(secondDraft.includes('testProperty: here'));
    });
    test("Check the content updates correctly",()=>{

    });
}
);