// The checks from

import * as assert from 'assert';
import { createFromDraft } from '../functions/drafts/createFromDraft';

suite('Create draft function checks',()=>{

    test("Frontmatter for first draft changed correctly",()=>{
        const content= '---\ndraftNum: 1\ntestProperty: here\n---\nBody text';
        const secondDraft = createFromDraft(content,1);
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: ## Complete First Draft') );
        assert.ok(secondDraft.includes('testProperty: here'));
    });

    test("Frontmatter changed correctly",()=>{
        const content= '---\ndraftNum: 3\ntestProperty: here\n---\nBody text';
        const secondDraft = createFromDraft(content,3);
        assert.ok(secondDraft.includes('draftNum: 4'));
        assert.ok(secondDraft.includes('completeSection: ## Complete Third Draft') );
        assert.ok(secondDraft.includes('testProperty: here'));
    });

});