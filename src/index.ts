import * as notionParser from "./notion-to-md";
import { Client } from "@notionhq/client";
import { marked } from 'marked';

export interface Config {
    apiKey: string;
    pageId: string;
}

export class NotionHTMLParser {
    notionClient: Client;
    constructor(private config: Config) {
        if (!config.apiKey || !config.pageId || config.apiKey.length < 10 || config.pageId.length < 10) {
            throw new Error("apiKey or pageId is not defined");
        }

        this.notionClient = new Client({
            auth: config.apiKey,
        });
    }

    async getHTML(): Promise<string> {
        const n2m = new notionParser.NotionToMarkdown({ 
            notionClient: this.notionClient, 
            config: {
                parseChildPages: true,
            }
        });

        const { results } = await this.notionClient.blocks.children.list({
            block_id: this.config.pageId,
        });

        const x = await n2m.blocksToMarkdown(results);
        let markDownString = n2m.toMarkdownString(x);
        
        return marked.parse(markDownString.parent);
    }
}