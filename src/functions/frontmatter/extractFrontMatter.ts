import { frontMatterEndIndicator, frontMatterIndicator } from "../../constants/frontMatterConstants";

// FrontMatterExtractor
// Extract frontmatter with checks if it is not found.
// Could this be a maybe type?

export function extractFrontMatter(content:string):[boolean,[string,string][]]{
    const keepGoing = content.indexOf(frontMatterEndIndicator)> -1;
    let foundFrontmatter = false;
    const newLine="\n";
    // Is there frontmatter?
    if(!keepGoing){
        return [foundFrontmatter,[]];
    }
    foundFrontmatter = true;
    
    const frontmatterSplit= content.slice(frontMatterIndicator.length,content.indexOf(frontMatterEndIndicator))
    .split(newLine)
    .flatMap((line)=>{
        return line.trim();
    })
    .slice(1);

    let frontMatterProperties:[string,string][] = [];
    
    frontmatterSplit
    .map((line) => line.split(":"))
    .filter((keyVal) => keyVal.length === 2)
    .forEach(([key, value]) => {
        frontMatterProperties.push([key.trim(), value.trim()]);
    });

    return [foundFrontmatter,frontMatterProperties];
}