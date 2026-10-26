import { updateFrontmatter } from "../frontmatter/updateFrontmatter";
import { createFromDraft } from "./createFromDraft";
import { createFromFirstDraft } from "./createFromFirstDraft";
import { splitContent } from "./splitContent";

export default function createDraft(fileText:string){
    let [tempFrontMatter,content] = splitContent(fileText);
    let [frontMatter,oldDraftNum] = updateFrontmatter(tempFrontMatter);    
    
    const updatedContent = oldDraftNum ===1 ? 
                createFromFirstDraft(content):createFromDraft(content,oldDraftNum);

    const updatedFile = frontMatter + updatedContent;
    return updatedFile;
    
}