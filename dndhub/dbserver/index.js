import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { Database } from './database.js';
import { DatabasePaths } from './database.paths.js';
import { authRouter } from './routes/auth.routes.js';


const app = express();
const PORT = 10000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);


const api_references = JSON
.parse(fs.readFileSync('./models/data/api_references.json', 'utf8'));

const test = (req, res) => {
  const db = Database.get();

  const queries = api_references
  .map((obj) => {
    const index = obj.index;
    const name = obj.name;
    const url = obj.url;
    const note = obj.note || null;
  
    return `
      insert or ignore into APIReference (idx, name, url, note) values ("${index}", "${name}", "${url}", "${note}")
    `;
  })
  .join('; ');

  db.exec(queries);

  db.all("SELECT * from APIReference", (err, rows) => {
    res.send(JSON.stringify(rows, null, 2))
  })
}


app.get('/', (req, res) => {
  Database.loadSchema(DatabasePaths.SCHEMAS);
  test(req, res);
});


app.listen(PORT, () => () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
