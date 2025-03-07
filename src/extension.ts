import * as vscode from 'vscode';
import { makeApiCall } from './utils/utils';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.resolve(__dirname, '../.env')}); // Not using abs. path was not working.

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "theasdfllmext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('theasdfllmext.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from llm_vscode_ext! hohoho');
	});

	const disposable1 = vscode.commands.registerCommand('theasdfllmext.captureText', () => {
		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const highlighted = editor.document.getText(selectionRange);

			makeApiCall(highlighted).then(response => {
				vscode.window.showInformationMessage(response);
			})
			.catch(err => {
				vscode.window.showInformationMessage("Error making api call: " + err.message);
			});
		} else{
			vscode.window.showInformationMessage("Nothing was selected, stopping.");
		}
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
