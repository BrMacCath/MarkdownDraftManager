import { updateFrontmatter } from "../frontmatter/updateFrontmatter";
import { createFromDraft } from "./createFromDraft";
import { createFromFirstDraft } from "./createFromFirstDraft";
import { splitContent } from "./splitContent";

// This creates a new draft.
// The method to create a new draft differs from a first
// draft to the rest so those are isolated apart.

export default function createDraft(fileText:string){
    let [_,content] = splitContent(fileText);
    let [frontMatter,oldDraftNum] = updateFrontmatter();  
    const updatedContent = oldDraftNum === 1 ? 
                createFromFirstDraft(content):createFromDraft(content,oldDraftNum);
    const updatedFile = frontMatter + "\n" + updatedContent;
    return updatedFile;
    
}