import { stringifyNumber } from "./stringifyNumber";

export function createDraftTitle(draftNum: number){
    return "# " + stringifyNumber(draftNum) +" Draft";
}