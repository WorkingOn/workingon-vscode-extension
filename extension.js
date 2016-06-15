'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    let updateTokenDisposable = vscode.commands.registerCommand('extension.updateToken', () => {
        vscode.window.showInformationMessage('Update token Initiated.')
    });

    context.subscriptions.push(updateTokenDisposable);

    let updateWorkingOnDisposable = vscode.commands.registerCommand('extension.updateWorkingOn', () => {
        vscode.window.showInformationMessage('Update WorkingOn Initiated.')
    });

    context.subscriptions.push(updateWorkingOnDisposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;