import * as vscode from 'vscode';
import { frontMatterEndIndicator, frontMatterIndicator } from '../../constants/frontMatterConstants';

export function splitContent(text:string):[string,string] {
    const start_file = text.slice(0, 3);
    if (frontMatterIndicator !== start_file) {
        vscode.window.showInformationMessage("Front matter is missing");
        // This needs to be an error function instead of just a notice
        return ["",""];
    }
    const index = text.indexOf(frontMatterEndIndicator) + frontMatterEndIndicator.length;
    const frontMatter = text.slice(0, index);
    const content = text.slice(index);
    return [frontMatter,content];
}