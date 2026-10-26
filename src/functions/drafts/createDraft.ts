import { updateFrontmatter } from "../frontmatter/updateFrontmatter";
import { createFromDraft } from "./createFromDraft";
import { createFromFirstDraft } from "./createFromFirstDraft";
import { splitContent } from "./splitContent";

export default function createDraft(fileText:string){
    let [tempFrontMatter,content] = splitContent(fileText);
    let [frontMatter,oldDraftNum] = updateFrontmatter(tempFrontMatter);    

    if (oldDraftNum === 1){
        // Here we add the new title for the 
        const updatedContent = createFromFirstDraft(content);
        const updatedFile = frontMatter + updatedContent;
        return updatedFile;
    }
    else{
        const updatedContent = createFromDraft(content,oldDraftNum);
        const updatedFile = frontMatter + updatedContent;
        return updatedFile;
    }

}