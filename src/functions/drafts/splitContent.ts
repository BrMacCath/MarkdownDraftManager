import * as vscode from 'vscode';
import { frontMatterEndIndicator, frontMatterIndicator } from '../../constants/frontMatterConstants';

export function splitContent(text:string):[string,string] {
    const startFile = text.slice(0, 3);
    if (frontMatterIndicator !== startFile) {
        vscode.window.showInformationMessage("Front matter is missing");
        // This needs to be an error function instead of just a notice
        return ["",""];
    }
    const frontMatterEndIndex= text.indexOf(frontMatterEndIndicator);
    if (frontMatterEndIndex === -1) {
        vscode.window.showInformationMessage("Front matter ending is missing");
        // This needs to be an error function instead of just a notice
        return ["",""];
    }

    const frontMatter = text.slice(0, frontMatterEndIndex).trim();
    
    let content         = text.slice(frontMatterEndIndex + frontMatterEndIndicator.length).trim();
    const endFrontIndex = content.indexOf(frontMatterIndicator)+ frontMatterIndicator.length; 
    content             = content.slice(endFrontIndex).trim();
    return [frontMatter,content];
}