"use strict";
import * as vscode from "vscode";
import { CodeManager } from "./codeManager";

export function activate(context: vscode.ExtensionContext) {

    console.log("vscode-runner-frp is now active!");

    const codeManager = new CodeManager();

    vscode.window.onDidCloseTerminal(() => {
        codeManager.onDidCloseTerminal();
    });

    const run = vscode.commands.registerCommand("code-runner-frp.run", (fileUri: vscode.Uri) => {
        codeManager.run(null, fileUri);
    });

    const runCustomCommand = vscode.commands.registerCommand("code-runner-frp.runCustomCommand", () => {
        codeManager.runCustomCommand();
    });

    const runByLanguage = vscode.commands.registerCommand("code-runner-frp.runByLanguage", () => {
        codeManager.runByLanguage();
    });

    const stop = vscode.commands.registerCommand("code-runner-frp.stop", () => {
        codeManager.stop();
    });

    const runOrStop = vscode.commands.registerCommand("code-runner-frp.runOrStop", (fileUri: vscode.Uri) => {
        if (codeManager.isRunning()) {
            codeManager.stop();
        } else {
            codeManager.run(null, fileUri);
        }
    });

    context.subscriptions.push(run);
    context.subscriptions.push(runCustomCommand);
    context.subscriptions.push(runByLanguage);
    context.subscriptions.push(stop);
    context.subscriptions.push(runOrStop);
    context.subscriptions.push(codeManager);
}

export function deactivate() {
}
