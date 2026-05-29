const database = require('./database');

const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 10000;

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.send('Server attivo');
});
app.listen(PORT, () => () => {console.log(`Server in ascolto su http://localhost:${PORT}`);});

app.get('api/DamageTypes', (request, response) => {
    const damageTypes = database.loadSchema('./schemas/5e-Damage-Types.sql');
    damageTypes.run('INSERT OR IGNORE INTO DamageTypes (index,name,description,url) VALUES ('index1', 'gianni', 'descrizione', 'url')');
});