"use strict";
import appInsights = require("applicationinsights");
import * as vscode from "vscode";

export class AppInsightsClient {
    private _client;
    private _enableAppInsights;

    constructor() {
        this._client = appInsights.getClient("a25ddf11-20fc-45c6-96ae-524f47754f28");
        const config = vscode.workspace.getConfiguration("code-runner-frp");
        this._enableAppInsights = config.get<boolean>("enableAppInsights");
    }

    public sendEvent(eventName: string, properties?: { [key: string]: string; }): void {
        if (this._enableAppInsights) {
            this._client.trackEvent(eventName === "" ? "bat" : eventName, properties);
        }
    }
}
