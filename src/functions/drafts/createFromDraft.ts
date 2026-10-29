import { splitParagraphsFrontMatter } from "../paragraphs/splitParagraphsFrontMatter";
import { splitParagraphsNoFrontMatter } from "../paragraphs/splitParagraphsNoFrontMatter";
import { createDraftTitle } from "./createDraftTitle";
import { stringifyNumber } from "./stringifyNumber";
import * as vscode from 'vscode';


export function createFromDraft(draft:string,oldDraftNum:number){
    const config = vscode.workspace.getConfiguration('myExtension');
    const paragraphSeparator = config.get<string>("draftStyle.paragraphSeparator", '+---+');
    const topicFrontMatterSeparator = config.get<string>("draftStyle.topicFrontmatterSeparator","*---*");
    const haveTopicFrontMatter = config.get<boolean>("draftStyle.haveTopicFrontmatterSeparator",true);
    const rewriteLineSignifier = config.get<string>("draftStyle.rewriteLineSignifier",">");
    const commentLineSignifier =  config.get<string>("draftStyle.commentSignifier");

    const newLineSeperator = "\n"+commentLineSignifier + " \n" + rewriteLineSignifier +" \n\n";
    // Select the content from the current draft.
    const currentDraftTitle = createDraftTitle(oldDraftNum);
    const contentIndex = draft.indexOf(currentDraftTitle) + currentDraftTitle.length;
    const contentDraft = draft.slice(contentIndex);
    let paragraphs = contentDraft.split(paragraphSeparator);
    let splitParagraph: [string,string[]][] = [];


    if(!haveTopicFrontMatter){
        splitParagraph =splitParagraphsNoFrontMatter(paragraphs,rewriteLineSignifier);
    }
    else
    {
        splitParagraph = splitParagraphsFrontMatter(paragraphs,rewriteLineSignifier,topicFrontMatterSeparator);
    }
    // Complete Draft
    let completeDraft:string[] = [];
    let newDraft:string[] = [];
    splitParagraph.forEach( (content)=>{
        const sentences = content[1].map(t =>t.replace(".",""));
        completeDraft.push(sentences.join(". ") +".");
    }  );

    // Make new draft based on the topic front matter.
    if(!haveTopicFrontMatter){
        splitParagraph.forEach((content)=>{
            const sentences = content[1].map(t => t.replace(".",""));
            newDraft.push("\n"+sentences.join(newLineSeperator)+newLineSeperator );
        });
    }
    else{
        splitParagraph.forEach((content)=>{
            const topicFrontMatter = content[0].trim();
            const sentences = content[1].map(t =>{
            return t.replace(".","");
        });
            newDraft.push(topicFrontMatter+"\n\n"+ topicFrontMatterSeparator+ "\n" +sentences.join(newLineSeperator)+newLineSeperator );
        });
    }
    // New Draft
    let newContent = "";
    newContent += `\n\n## Complete ${stringifyNumber(oldDraftNum)} Draft\n\n` + completeDraft.join("\n\n")+"\n\n";
    newContent += `# ${stringifyNumber(oldDraftNum+1)} Draft\n\n` + newDraft.join(paragraphSeparator +"\n");
    return draft + newContent;
}
