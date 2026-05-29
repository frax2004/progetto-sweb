import sqlite3 from 'sqlite3'; 
import fs from 'fs'; 

export const database = new sqlite3.Database('./database/placeholder.db', () => {;}); 

function loadSchema(schemaPath: string) {
    // quando avremo TANTO tempo fare controllo per path
    const schema = fs.readFileSync(schemaPath, 'utf8');
    database.exec(schema, () => {;});
}