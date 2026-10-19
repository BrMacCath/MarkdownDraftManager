import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { frontMatterEndIndicator, frontMatterIndicator } from '../constants/frontMatterConstants';
// import * as myExtension from '../../extension';

suite('Test frontmatter constants',() =>{
	test('frontmatter indicator Constant',()=>{
		assert.strictEqual(frontMatterIndicator,'---');
	});
	test('frontmatter end indicator Constant',()=>{
		assert.strictEqual(frontMatterEndIndicator,'\n---\n');
	});
});
