// The checks from
import * as vscode from 'vscode';
import * as assert from 'assert';
import { updateFrontmatter } from '../functions/frontmatter/updateFrontmatter';

suite('Create draft function checks',()=>{
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

    test("Frontmatter changed correctly",async()=>{
        const doc = await vscode.workspace.openTextDocument({
            language: 'markdown',
            content: '---\ndraftNum: 3\ntestProperty: here\n---\nBody text',
        });
        await vscode.window.showTextDocument(doc);
        
        const [secondDraft,_] = updateFrontmatter();
        assert.ok(secondDraft.includes('draftNum: 4'));
        assert.ok(secondDraft.includes('completeSection: \"## Complete Third Draft\"') );
        assert.ok(secondDraft.includes('testProperty: here'));
    });
    // Have a test where you put content through the create draft function
    // with different settings conditions.
    test("Check create from Draft will make a new draft. Have Topic Frontmatter and comments",()=>{
        // 
        // await config.update('frontmatter.draftNumIndicator', 'revision', vscode.ConfigurationTarget.Global);
    });

    test("Check create from Draft will make a new draft. Have Topic Frontmatter, no comments",()=>{
        // const config = vscode.workspace.getConfiguration('myExtension');
        // await config.update('frontmatter.draftNumIndicator', 'revision', vscode.ConfigurationTarget.Global);
    });

    test("Check create from Draft will make a new draft. No Topic Frontmatter or comments",()=>{
        // const config = vscode.workspace.getConfiguration('myExtension');
        // await config.update('frontmatter.draftNumIndicator', 'revision', vscode.ConfigurationTarget.Global);
    });
});