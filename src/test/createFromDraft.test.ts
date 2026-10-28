// The checks from

import * as assert from 'assert';
import { createFromDraft } from '../functions/drafts/createFromDraft';

suite('Draft Create function checks',()=>{

    test("Frontmatter changed correctly",()=>{
        const content= '---\ndraftNum: 3\n---\nBody text';
        const secondDraft = createFromDraft(content,3);
        assert.ok(secondDraft.includes('draftNum: 4'));
        assert.ok(secondDraft.includes('completeSection: ## Complete Third Draft') );
    });

});