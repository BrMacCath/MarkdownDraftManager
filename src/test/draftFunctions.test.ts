import * as assert from 'assert';
import { removeInlineComments } from '../functions/drafts/removeInlineComments';


suite("Testing functions around sentence structure",()=>{
    const testLine = 'This is without \{\[Or with]\} a comment';
    const testResult = 'This is without a comment';
    test("Inline comment removes the comment",() =>{
        assert.deepStrictEqual(removeInlineComments(testLine),testResult);
    });
});