// First Draft properties to check

// Topic Frontmatter effects

// Change in draft num

// Change in completeSectionIndicator

import * as assert from 'assert';
import { createFromFirstDraft } from '../functions/drafts/createFromFirstDraft';
import createDraft from '../functions/drafts/createDraft';

suite('First Draft Create function checks',()=>{
    test('Frontmatter created correctly',async ()=>{
        const content= 'Body text';
        const secondDraft = createFromFirstDraft(content);
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: ## Complete First Draft') );
    });

    test("Frontmatter changed correctly",()=>{
        const content= '---\ndraftNum: 1\n---\nBody text';
        const secondDraft = createDraft(content);
        assert.ok(secondDraft.includes('draftNum: 2'));
        assert.ok(secondDraft.includes('completeSection: ## Complete First Draft') );
        assert.ok(!secondDraft.includes('# Second Draft'));
    });
    test("Check the content updates correctly",()=>{

    });
}
);