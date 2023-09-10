
import  *  as notionParser from "./notion-to-md";
import  { Client }  from "@notionhq/client";
import { marked }  from 'marked';
export interface Config {
    apiKey: string;
    pageId: string;
}
async function getHTML(config: Config) {
    if(!config.apiKey || !config.pageId || config.apiKey.length < 10 || config.pageId.length < 10) throw new Error("apiKey or pageId is not defined");
    let notionClient = new Client({
        auth: config.apiKey,
    })
    const n2m = new notionParser.NotionToMarkdown({ notionClient: notionClient, config:{
        parseChildPages: true,
    }});
    const { results } = await notionClient.blocks.children.list({
        block_id: config.pageId,
    });
    const x = await n2m.blocksToMarkdown(results);
    let markDownString = n2m.toMarkdownString(x);

    let html = marked.parse(markDownString.parent)
    return html
}
export default getHTML;