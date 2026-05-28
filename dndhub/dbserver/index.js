const express = require('express');
const cors = require('cors');
let app = express();

app.use(cors());
app.use(express.json());

app.get('/', () => {});
app.listen(PORT, () => {});