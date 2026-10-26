import * as vscode from 'vscode';


export function updateFrontmatter(frontmatter:string):[string,number]{
    const draftNumIndicator = vscode.workspace.getConfiguration('myExtension').get<string>('frontmatter.draftNumIndicator',"draftNum");
    const draftInd = frontmatter.indexOf(draftNumIndicator);
    if (draftInd===-1){
        vscode.window.showInformationMessage("This file does not contain the frontmatter to indicate the draft number.");
    }
    let tempFile = frontmatter.slice(draftInd + draftNumIndicator.length+1);
    const endLineInd = tempFile.indexOf("\n");
    const draftNum = Number( tempFile.slice(0,endLineInd).trim() );
    const newDraftNum = draftNum + 1;
    frontmatter = frontmatter.replace(draftNumIndicator +": " + draftNum, draftNumIndicator +": " + newDraftNum  );
    return [frontmatter,draftNum];
}