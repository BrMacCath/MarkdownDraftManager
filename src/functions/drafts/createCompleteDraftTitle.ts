import { stringifyNumber } from "./stringifyNumber";

export function createCompleteDraftTitle(draftNum: number){
    return "## Complete " + stringifyNumber(draftNum) +" Draft";
}