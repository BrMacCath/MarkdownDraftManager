// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import createDraft from './functions/drafts/createDraft';

export function activate(context: vscode.ExtensionContext) {
	// Command to update a markdown file 
	// First we ensure it is a md file and then edit with
	// new draft from new draft function.
	const updateDraftCommand = vscode.commands.registerCommand('markdown-draft-manager.updateMarkdownDraft', async () => {

		const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('No file is currently open.');
			return;
		}

		const document: vscode.TextDocument = editor.document;

		if (document.languageId !== 'markdown') {
			vscode.window.showInformationMessage('The current file is not markdown.');
			return;
		}

		const newte = createDraft(document.getText());
		console.log(newte);
		const fullRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(document.getText().length)
		);

		const success = await editor.edit(editBuilder => {
			//editBuilder.replace(fullRange, newDraft);
		});

		if (!success) {
			vscode.window.showErrorMessage('Failed to edit the document.');
		}
	});
  context.subscriptions.push(updateDraftCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
