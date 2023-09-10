
import  *  as notionParser from "./notion-to-md";
import  { Client }  from "@notionhq/client";
import { marked }  from 'marked';

async function getHTML(apiKey: string, pageId: string) {
    if(!apiKey || !pageId || apiKey.length < 10 || pageId.length < 10) throw new Error("apiKey or pageId is not defined");
    let notionClient = new Client({
        auth: apiKey,
    })
    const n2m = new notionParser.NotionToMarkdown({ notionClient: notionClient, config:{
        parseChildPages: true,
    }});
    const { results } = await notionClient.blocks.children.list({
        block_id: pageId,
    });
    const x = await n2m.blocksToMarkdown(results);
    let markDownString = n2m.toMarkdownString(x);

    let html = marked.parse(markDownString.parent)
    return html
}
export default getHTML;