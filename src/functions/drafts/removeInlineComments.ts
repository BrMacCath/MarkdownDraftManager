// The goal of this function will remove comments
// inside braces chosen by the user. Right now I 
// Have chosen the braces. Removing comments sometimes 
// leaves double spaces.

export function removeInlineComments(line:string){
    const doubleSpace = "  ";
    const singleSpace = " ";
    const frontBrace = String.raw`\{\[`;
    const backBrace = String.raw`\]\}`;
    let regString = String.raw`${frontBrace}(.*?)${backBrace}`;
    let re = new RegExp(regString,"g" );
    const removedCommentLine = line.replace(re,"");
    const removeDoubleSpacesLine = removedCommentLine.replace(doubleSpace,singleSpace);
    return removeDoubleSpacesLine;
}