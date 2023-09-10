const getHtml = require("./build/index");


(async () => {
    let data = await getHtml.default("secret_kyymFPGNFemfZ46rQ5VfsVIf24JHOX6yWjM1J762PJ4", "15137e82c6ad4749acd75e17ce5cf14f");
    console.log(data)
  })();
