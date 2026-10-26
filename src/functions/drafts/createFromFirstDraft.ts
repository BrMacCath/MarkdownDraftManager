import * as vscode from "vscode";
//What should this do?
// Add onto the draft in two ways.
// First it should have a completed draft added onto the end of the draft.
// Second it should add onto the 
// Return [frontmatter,content]
export function createFromFirstDraft(draft:string){
    const config = vscode.workspace.getConfiguration('myExtension');
    const paragraphSeparator = config.get<string>("draftStyle.paragraphSeparator", '+---+');
    const topicFrontMatterSeparator = config.get<string>("draftStyle.topicFrontmatterSeparator","*---*");
    const haveTopicFrontMatter = config.get<boolean>("draftStyle.haveTopicFrontmatterSeparator",true);
    const rewriteLineSignifier = config.get<string>("draftStyle.rewriteLineSignifier",">");
    const commentLineSignifier =  config.get<string>("draftStyle.commentSignifier");
    
    const newLineSeperator = "\n"+commentLineSignifier + " \n" + rewriteLineSignifier +" \n\n";
    let paragraphs = draft.split(paragraphSeparator);
    let splitParagraph: [string,string[]][] = [];
    if( !haveTopicFrontMatter){
        paragraphs.forEach((paragraph) =>{
            const paraContent = paragraph.split(".");
            splitParagraph.push(["",paraContent]);
        } );
    }
    else{
        paragraphs.forEach( (paragraph) =>{
            const temp = paragraph.split(topicFrontMatterSeparator);
            if(temp.length !== 2){
                vscode.window.showInformationMessage("Something has gone wrong. Length is " + temp.length);
            }
            const paraContent = temp[1].split(".");

            splitParagraph.push([temp[0],paraContent]);
        }  );
    }

    // Complete Draft
    let completeDraft:string[] = [];
    let newDraft:string[] = [];
    splitParagraph.forEach( (content)=>{
        const sentences = content[1].filter((t) =>{
            return t.trim()!=="";
        } );
        completeDraft.push(sentences.join(".") +"."); 
    }  );

    // Make new draft based on the topic front matter.
    if(!haveTopicFrontMatter){
        splitParagraph.forEach((content)=>{
            const sentences = content[1].filter((t) =>{t.trim()!=="";});
            newDraft.push(sentences.join(newLineSeperator)+newLineSeperator );
        });
    }
    else{
        splitParagraph.forEach((content)=>{
            const topicFrontMatter = content[0];
            const sentences = content[1].filter((t) =>{
                return t.trim()!=="";
             });
            newDraft.push(topicFrontMatter+ topicFrontMatterSeparator +sentences.join(newLineSeperator)+newLineSeperator );
        });
    }
    // New Draft
    let newContent = "";
    newContent += "\n\n## Complete First Draft\n\n" + completeDraft.join("\n\n")+"\n\n";
    newContent += "# Second Draft\n\n" + newDraft.join(paragraphSeparator);
    draft += newContent;
    return draft;
}