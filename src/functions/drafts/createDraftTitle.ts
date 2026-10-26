import { stringifyNumber } from "./stringifyNumber";

export function createDraftTitle(draftNum: number){
    return "## Complete " + stringifyNumber(draftNum) +" Draft";
}