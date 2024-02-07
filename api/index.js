//  ━━━━-╮
//╰┃ ┣▇━▇
// ┃ ┃  ╰━▅╮
// ╰┳╯ ╰━━┳╯F A S I L I T O
// ╰╮ ┳━━╯ E L T U T O R I A L
// ▕▔▋ ╰╮╭━╮
// ╱▔╲▋╰━┻┻╮╲╱▔▔▔▔╲
// ▏ ▔▔▔▔▔▔▔ O O┃
// ╲╱▔╲▂▂▂▂╱▔╲▂▂▂╱
//  ▏╳▕▇▇▕ ▏╳▕▇▇▕
//  ╲▂╱╲▂╱ ╲▂╱╲▂╱

const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
const port = process.env.PORT || 3001;
conn.sync().then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
