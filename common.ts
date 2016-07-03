'use strict';

import * as vscode from 'vscode';
import * as envi from './environmentPath';
import * as fManager from './fileManager';
import {Setting} from './setting';


export class Common {

    public ERROR_MESSAGE: string = "ERROR ! Logged In Console (Help menu > Toggle Developer Tools). Please open an issue in Github Repo.";

    constructor(private en: envi.Environment) {

    }

    public async GetTokenAndSave(sett: Setting): Promise<boolean> {
        var me = this;
        var opt = Common.GetInputBox(true);
        return new Promise<boolean>((resolve, reject) => {

            vscode.window.showInputBox(opt).then(async (token) => {
                token = token.trim();
                if (token) {
                    sett.Token = token;
                    await me.SaveSettings(sett).then(function (saved: boolean) {
                        if (saved) {
                            vscode.window.setStatusBarMessage("Token Saved", 1000);
                        }
                        resolve(saved);
                    }, function (err: any) {
                        reject(err);
                    });
                }
            });
        });
    }

    public async SaveSettings(setting: Setting): Promise<boolean> {
        var me = this;
        return new Promise<boolean>(async (resolve, reject) => {
            await fManager.FileManager.WriteFile(me.en.APP_SETTINGS, JSON.stringify(setting)).then(function (added: boolean) {
                resolve(added);
            }, function (err: any) {
                reject(err);
            });
        });

    }

    public static GetInputBox(token: boolean) {
        if (token) {
            let options: vscode.InputBoxOptions = {
                placeHolder: "Enter WorkingOn Token",
                password: false,
                prompt: "Link is opened to get the WorkingOn token."
            };
            return options;
        }
        else {
            let options: vscode.InputBoxOptions = {
                placeHolder: "TODO: get file name? or project name?",
                password: false,
                prompt: "What are you working on?"
            };
            return options;
        }
    };

}