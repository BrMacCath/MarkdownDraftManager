import { frontMatterEndIndicator } from "../../constants/frontMatterConstants";

export function removeFrontMatter(fileContent:string){
    const endIndex = fileContent.indexOf(frontMatterEndIndicator);
    if(endIndex===-1){
        return fileContent;
    }
    const content = fileContent.slice(endIndex + frontMatterEndIndicator.length);
    return content;
}