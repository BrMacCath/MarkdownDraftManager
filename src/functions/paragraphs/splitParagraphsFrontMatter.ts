import * as vscode from 'vscode';


export function splitParagraphsFrontMatter(paragraphs:string[]){
    const config = vscode.workspace.getConfiguration('myExtension');
    
    const topicFrontMatterSeparator = config.get<string>("draftStyle.topicFrontmatterSeparator","*---*");
    const rewriteLineSignifier = config.get<string>("draftStyle.rewriteLineSignifier",">");
    let splitParagraph:[string,string[]][] = [];
    paragraphs
    .forEach( (paragraph) =>{
        const temp = paragraph.split(topicFrontMatterSeparator);
        const paraContent = temp[1].split("\n").filter((t) => {
            return t[0] === rewriteLineSignifier;
        }).map(t =>{
            return t.slice(1).trim();
        });
        splitParagraph.push([temp[0].trim(),paraContent]);
}  );
    return splitParagraph;
}