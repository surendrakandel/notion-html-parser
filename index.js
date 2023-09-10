const { NotionHTMLParser } = require("./build/index");


(async () => {
    let parser =  new NotionHTMLParser({
        apiKey: "secret_kyymFPGNFemfZ46rQ5VfsVIf24JHOX6yWjM1J762PJ4",
        pageId: "15137e82c6ad4749acd75e17ce5cf14f",
    });
    const html = await parser.getHTML();
    console.log(html);
  })();
