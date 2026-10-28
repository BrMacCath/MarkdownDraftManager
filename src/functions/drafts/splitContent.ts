import * as vscode from 'vscode';
import { frontMatterEndIndicator, frontMatterIndicator } from '../../constants/frontMatterConstants';

export function splitContent(text:string):[string,string] {
    const start_file = text.slice(0, 3);
    if (frontMatterIndicator !== start_file) {
        vscode.window.showInformationMessage("Front matter is missing");
        // This needs to be an error function instead of just a notice
        return ["",""];
    }
    const frontMatterEndIndex= text.indexOf(frontMatterEndIndicator);
    if (frontMatterEndIndex !== -1) {
        vscode.window.showInformationMessage("Front matter ending is missing");
        // This needs to be an error function instead of just a notice
        return ["",""];
    }

    const frontMatter = text.slice(0, frontMatterEndIndex).trim();
    const content = text.slice(frontMatterEndIndex + frontMatterEndIndicator.length).trim();
    return [frontMatter,content];
}