import { Routes } from './database.routes';
import { Database } from './database';

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 10000;

app.use(cors());
app.use(express.json());



app.get('/', (request, response) => {
  Database.loadSchema('./schemas/DatabaseSchemas.sql');
});

app.get(Routes.SPECIES, (req, res) => {
  const query = `

  `;
  Database.get().run(query);
});

app.listen(PORT, () => () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
