import * as vscode from 'vscode';


export function splitParagraphsFrontMatter(paragraphs:string[],rewriteLineSignifier:string,topicFrontMatterSeparator:string){
    let splitParagraph:[string,string[]][] = [];
    paragraphs.forEach( (paragraph) =>{
        const temp = paragraph.split(topicFrontMatterSeparator);
        if(temp.length !== 2){
            vscode.window.showInformationMessage("Something has gone wrong. Length is " + temp.length);
        }
        const paraContent = temp[1].split("\n").filter((t) => {
            return t[0] === rewriteLineSignifier;
        }).map(t =>{
            return t.slice(1).trim();
        });
        splitParagraph.push([temp[0].trim(),paraContent]);
}  );
    return splitParagraph;
}