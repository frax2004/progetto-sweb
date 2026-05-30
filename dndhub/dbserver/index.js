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

app.get('/users', (request, response) => {
    // response.send('Route aperta 5');
    const db = database.loadSchema('./schemas/DatabaseSchemas.sql');
    db.run("INSERT OR IGNORE INTO DamageTypes (idx,name,description,url) VALUES ('index1', 'gianni', 'descrizione', 'url')",
        (err,res) => {
            if (err!==null) console.log('Ciao mi chiamo pollara');
        }
    );
    db.all("SELECT * FROM DamageTypes", 
        (err,res) => {
            if (!err) response.json(res);
            else response.status(500).json(err.message);
        }
    );
});