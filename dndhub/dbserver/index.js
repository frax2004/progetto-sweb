import { Routes } from './routes/database.routes.js';
import { Database } from './database.js';
import fs from 'fs';
import { authRouter } from './routes/auth.routes.js';

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 10000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);




// const api_references = JSON
// .parse(fs.readFileSync('./models/data/api_references.json', 'utf8'));

app.get('/', (request, response) => {
  Database.loadSchema('./schemas/DatabaseSchemas.sql');

  // response.send("Server aperto");
  // const queries = api_references
  // .map((obj) => {
  //   const index = obj.idx;
  //   const name = obj.name;
  //   const url = obj.url;
  //   const note = obj.note || null;

  //   return `
  //     insert or ignore into APIReference (idx, name, url, note) values ("${index}", "${name}", "${url}", "${note}")
  //   `;
  // })
  // .join('; ');

  // Database.get().exec(queries);

  // Database.get().all("SELECT * from APIReference", (err, rows) => {
  //   response.send(JSON.stringify(rows, null, 2))
  // })

  Database.get()
  .run(
    `
      insert or ignore into Account (email, password, username) values ("nannibutera08@gmail.com", "password", "giovanni")
     `
  );

  Database.get().all("SELECT * from Account", (err, rows) => {
    response.send(JSON.stringify(rows, null, 2))
  })
});









app.get(Routes.SPECIES, (req, res) => {

  Database.get().run(query);
});









app.listen(PORT, () => () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
