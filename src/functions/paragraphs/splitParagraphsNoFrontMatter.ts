export function splitParagraphsNoFrontMatter(paragraphs:string[],rewriteLineSignifier:string){
    let splitParagraph:[string,string[]][] = [];
    paragraphs.forEach((paragraph) =>{
        const paraContent = paragraph.split("\n").filter((t) => {
            return t[0] === rewriteLineSignifier;
        }).map(t =>{
            return t.slice(1).trim();
        });
        splitParagraph.push(["",paraContent]);
    } );
    return splitParagraph;
}