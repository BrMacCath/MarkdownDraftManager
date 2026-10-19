import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { makeDraftName } from '../testFile';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	test('makeDraftName', () => {
		assert.strictEqual(makeDraftName(' Notes ', 2), 'Notes-draft-2');
	});
});
