// 'use strict';


let vscode = require('vscode');
let configuration = vscode.workspace.getConfiguration('workingon');
let userToken = configuration.get('token');
let request = require("request");
// import 'lib/wo.utils.js'
// import 'lib/wo.request.js'
// let test = require('./lib/test.js');
// import 'lib/wo.token.js'
// let core = requre('./core');
// import * as commons from './common';
// import * as envir from './environmentPath';
// import {Setting} from './setting';



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
        return new Promise(resolve => {
            if(!userToken)
            {
                vscode.window.showInformationMessage('token undefined.');

            }
            else
            {
                let workOptions = {
                    source: 'vscode',
                    task: ''
                };
                vscode.window.showInputBox({ prompt: "What are you working on?" })
                    .then(value => {
                        workOptions.task = value;
                    })
                    .then(() => {
                        return request({
                            url: 'https://api.workingon.co/hooks/incoming?token='+userToken,
                            method: 'POST',
                            json: workOptions
                        }, function (error, response, body) {
                            console.log('request complete.');
                            console.log('response is: ', response.statusCode );
                            console.log('body is: ', body);
                            console.log('token is: ', userToken);
                            if(response.statusCode != 200){
                                if(response.statusCode == 403) {
                                    console.log('response is 403');
                                    body = JSON.parse(body);
                                    vscode.window.showInformationMessage('There seems to be a problem. '+ body.message + ' Error Code: ' + body.code);
                                    return(123);

                                }

                            }

                            if (!error && response.statusCode == 200) {
                                console.log(body) // Show the HTML for the Google homepage.
                                vscode.window.showInformationMessage(body);
                                vscode.window.showInformationMessage('Task updated.');

                                return(123);

                            }
                            else if(error) {
                                console.log('error: ', error);
                            }
                        });
                    });




            }
            console.log("Command is now finished");
        });

    });

    context.subscriptions.push(updateWorkingOnDisposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;