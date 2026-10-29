// First Draft properties to check

// Topic Frontmatter effects

// Change in draft num

// Change in completeSectionIndicator

import * as assert from 'assert';
import { updateFrontmatter } from '../functions/frontmatter/updateFrontmatter';
import * as vscode from 'vscode';



suite('First Draft Create function checks',()=>{
    const config = vscode.workspace.getConfiguration('myExtension');
    const keyHaveTopicFrontmatter = "draftStyle.haveTopicFrontmatterSeparator";
    const keyHaveComments = "draftStyle.haveLineComments";
    let originalHaveTopicFrontmatter: unknown;
    let originalHaveComments: unknown;

    setup(() => {
        // inspect() tells you what is set at each level, not just the effective value
        originalHaveTopicFrontmatter = config.inspect(keyHaveTopicFrontmatter)?.globalValue;
        originalHaveComments = config.inspect(keyHaveComments)?.globalValue;
    });

    teardown(async () => {
    // passing undefined removes the setting from that level
        await config
            .update(keyHaveTopicFrontmatter, originalHaveTopicFrontmatter, vscode.ConfigurationTarget.Global);
        await config
            .update(keyHaveComments, originalHaveComments, vscode.ConfigurationTarget.Global);
    });
    

    test("Check frontmatter will update correctly",async()=>{
        const doc = await vscode.workspace.openTextDocument({
            language: 'markdown',
            content: '---\ndraftNum: 1\ntestProperty: here\n---\nBody text',
        });
        await vscode.window.showTextDocument(doc);
        
        const [secondDraft,_] = updateFrontmatter();
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: \"## Complete First Draft\"') );
        assert.ok(secondDraft.includes('testProperty: here'));
    });
    test("Check the content updates correctly",()=>{
        //create from first draft
        // const doc = await vscode.workspace.openTextDocument({
        //     language: 'markdown',
        //     content: '---\ndraftNum: 1\ntestProperty: here\n---\nBody text',
        // });
        // await vscode.window.showTextDocument(doc);

        // Create from first draft
    });
    test("Check create from first Draft will make a new draft. Have Topic Frontmatter and comments",()=>{
        // const config = vscode.workspace.getConfiguration('myExtension');
        // await config.update('frontmatter.draftNumIndicator', 'revision', vscode.ConfigurationTarget.Global);
            
    });

    test("Check create from first Draft will make a new draft. Have Topic Frontmatter, no comments",()=>{
        // const config = vscode.workspace.getConfiguration('myExtension');
        // await config.update('frontmatter.draftNumIndicator', 'revision', vscode.ConfigurationTarget.Global);
    });

    test("Check create from first Draft will make a new draft. No Topic Frontmatter or comments",()=>{
        // const config = vscode.workspace.getConfiguration('myExtension');
        // await config.update('frontmatter.draftNumIndicator', 'revision', vscode.ConfigurationTarget.Global);
    });
}
);