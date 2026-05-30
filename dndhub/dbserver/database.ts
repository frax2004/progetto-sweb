import sqlite3 from 'sqlite3';
import fs from 'fs'; 

export namespace Database {
  const handle = new sqlite3.Database('./database/dndhub.db', (err) => {
    if(err) console.log(err.message);
  });
  
  export function get() {
    return handle;
  }

  export function loadSchema(schemaPath: string) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    get().exec(schema, (err) => {
      if (err) console.log(err.message);
    });
  }
}