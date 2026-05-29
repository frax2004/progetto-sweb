import sqlite3 from 'sqlite3'; 
import fs from 'fs'; 

export const database = new sqlite3.Database('./database/placeholder.db', () => {;}); 

export function loadSchema(schemaPath) {
    // quando avremo TANTO tempo fare controllo per path
    return fs.readFileSync(schemaPath, 'utf8');
    // const res = database.exec(schema, () => {;});
    // console.log(res);
}

// export function initDB() {
//     for (schema of './schemas') {

//     }
// }