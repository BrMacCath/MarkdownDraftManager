import { updateFrontmatter } from "../frontmatter/updateFrontmatter";
import { createFromDraft } from "./createFromDraft";
import { createFromFirstDraft } from "./createFromFirstDraft";
import { splitContent } from "./splitContent";
import * as vscode from 'vscode';

export default function createDraft(fileText:string){
    let [tempFrontMatter,content] = splitContent(fileText);
    const config = vscode.workspace.getConfiguration('myExtension');
    const draftNumSignifier = config.get<string>("frontmatter.draftNumIndicator", 'draftNum');
    const paragraphSeparator = config.get<string>("draftStyle.paragraphSeparator", '+---+');
    const topicFrontMatterSeparator = config.get<string>("draftStyle.topicFrontmatterSeparator","*---*");
    const haveTopicFrontMatter = config.get<boolean>("draftStyle.haveTopicFrontmatterSeparator",true);
    const rewriteLineSignfier = config.get<string>("draftStyle.rewriteLineSignifier",">");
    const commentLineSignifier =  config.get<string>("draftStyle.commentSignifier");
    // Update frontmatter through adding a new draft number
    let [frontMatter,oldDraftNum] = updateFrontmatter(tempFrontMatter, draftNumSignifier);    

    if (oldDraftNum === 1){
        // Here we add the new title for the 
        const updatedContent = createFromFirstDraft(content,paragraphSeparator,topicFrontMatterSeparator,haveTopicFrontMatter,rewriteLineSignfier,commentLineSignifier);
        const updatedFile = frontMatter + updatedContent;
        return updatedFile;
        //await app.vault.modify(fileTFile,updatedFile);
    }
    else{
        const updatedContent = createFromDraft(content,paragraphSeparator,oldDraftNum,topicFrontMatterSeparator,haveTopicFrontMatter,rewriteLineSignfier,commentLineSignifier);
        const updatedFile = frontMatter + updatedContent;
        return updatedFile;
    }

}