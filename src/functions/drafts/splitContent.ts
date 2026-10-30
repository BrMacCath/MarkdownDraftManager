import * as vscode from 'vscode';
import { frontMatterEndIndicator, frontMatterIndicator } from '../../constants/frontMatterConstants';

export function splitContent(text:string):[string,string] {
    const startFile = text.slice(0, 3);
    if (frontMatterIndicator !== startFile) {
        vscode.window.showInformationMessage("Front matter is missing");
        return ["", ""];
    }
    text = text.slice(3);
    const frontMatterEndIndex = text.indexOf(frontMatterEndIndicator);
    if (frontMatterEndIndex === -1) {
        vscode.window.showInformationMessage("Front matter ending is missing");
        return ["", ""];
    }

    const frontMatter = text.slice(0, frontMatterEndIndex).trim();
    const content = text.slice(frontMatterEndIndex + frontMatterEndIndicator.length).trim();
    return [frontMatter, content];
}