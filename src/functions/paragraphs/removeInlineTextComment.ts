export function removeInlineTextComment(str:string){
    const frontBrace = String.raw`\{\[`;
    const backBrace = String.raw`\]\}`;
    let testString = String.raw`${frontBrace}(.*?)${backBrace}`;
    let re = new RegExp(testString,"g" );
    return str.replace(re,"");
}