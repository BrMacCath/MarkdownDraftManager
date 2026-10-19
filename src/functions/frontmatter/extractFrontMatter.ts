import { frontMatterEndIndicator, frontMatterIndicator } from "../../constants/frontMatterConstants";

// FrontMatterExtractor
// Extract frontmatter with checks if it is not found.


export function extractFrontMatter(content:string):[boolean,[string,string][]]{
    const foundFrontmatter = content.indexOf(frontMatterEndIndicator)> -1;
    const newLine="\n";

    if(!foundFrontmatter){
        const frontMatterProperties:[string,string][] = [];
        return [foundFrontmatter,frontMatterProperties];
    }
    
    const frontmatterSplit= content.slice(frontMatterIndicator.length,content.indexOf(frontMatterEndIndicator))
    .split(newLine)
    .flatMap((line)=>{
        return line.trim();
    })
    .filter( (line) => line !== "");


    let frontMatterProperties:[string,string][] = [];

    frontmatterSplit
    .map((line) => line.split(":"))
    .filter((keyVal) => keyVal.length === 2)
    .forEach(([key, value]) => {
        frontMatterProperties.push([key.trim(), value.trim()]);
    });

    return [foundFrontmatter,frontMatterProperties];
}