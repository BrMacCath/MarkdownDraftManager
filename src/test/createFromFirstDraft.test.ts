// First Draft properties to check

// Topic Frontmatter effects

// Change in draft num

// Change in completeSectionIndicator

import * as assert from 'assert';
import { createFromFirstDraft } from '../functions/drafts/createFromFirstDraft';

suite('First Draft Create function checks',()=>{
    test('Frontmatter created correctly',async ()=>{
        const content= 'Body text';
        const secondDraft = createFromFirstDraft(content);
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: ## Complete Second Draft') );
    });

    test("Frontmatter changed correctly",()=>{
        const content= '---\nrevision: 1\n---\nBody text';
        const secondDraft = createFromFirstDraft(content);
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: ## Complete Second Draft') );
    });

}
);