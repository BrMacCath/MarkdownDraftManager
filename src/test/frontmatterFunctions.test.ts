// Tests to ensure frontmatter functions are working.

import * as assert from 'assert';
import { removeFrontMatter } from '../functions/frontmatter/removeFrontMatter';
import { frontMatterIndicator } from '../constants/frontMatterConstants';


// Tests how it removes frontmatter. Here is some test data
suite('Test frontmatter functions',() =>{
    const testFrontmatter ="---\ntest: Blah\n---\n";
    const testContent = "This is test content. This is here";
    test("Removes frontmatter",()=>{
        const testText = testFrontmatter+testContent;
        assert.strictEqual(removeFrontMatter(testText),testContent);
    });
    test("Does nothing",()=>{
        assert.strictEqual(removeFrontMatter(testContent),testContent);
    });
    test("Without an end Indicator it should stay the same",()=>{
        const testText = frontMatterIndicator + testContent;
        assert.strictEqual(removeFrontMatter(testText),testText);
    });
});