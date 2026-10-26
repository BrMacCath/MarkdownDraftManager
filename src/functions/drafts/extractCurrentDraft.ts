import { createDraftTitle } from "./createDraftTitle";
import { removeInlineComments } from "./removeInlineComments";


export function extractCurrentDraft(content:string,draftNum:number):[boolean,string] {
    
    const oldDraftNum = draftNum > 1 ? draftNum-1 : draftNum;

    const previousDraftTitle = createDraftTitle(oldDraftNum);
    const titleInd = content.indexOf(previousDraftTitle); 
    if (titleInd ===-1){
        const continueForward = false;
        return [continueForward,""];
    }

    const continueForward = true;
    const currentDraft = removeInlineComments(content.slice(titleInd + previousDraftTitle.length));
    return [continueForward, currentDraft];
}