import { Routes } from './database.routes.js';
import { Database } from './database.js';
import fs from 'fs';

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 10000;

app.use(cors());
app.use(express.json());


const api_references = JSON
.parse(fs.readFileSync('./models/data/api_references.json', 'utf8'));

app.get('/', (request, response) => {
  Database.loadSchema('./schemas/DatabaseSchemas.sql');

  const queries = api_references
  .map((obj) => {
    const index = obj.idx;
    const name = obj.name;
    const url = obj.url;
    const note = obj.note || null;

    return `
      insert or ignore into APIReference (idx, name, url, note) values ("${index}", "${name}", "${url}", "${note}")
    `;
  })
  .join('; ');

  Database.get().exec(queries);

  Database.get().all("SELECT * from APIReference", (err, rows) => {
    response.send(JSON.stringify(rows, null, 2))
  })
});









app.get(Routes.SPECIES, (req, res) => {

  Database.get().run(query);
});









app.listen(PORT, () => () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
