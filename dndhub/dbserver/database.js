import sqlite3 from 'sqlite3';
import fs from 'fs'; 

const sql = sqlite3.verbose()

const handle = new sql.Database('./database/dndhub.db', (err) => {
  if(err) console.log(err.message);
});

export class Database {

  static get() {
    return handle;
  }
  
  static loadSchema(schemaPath) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    Database.get().exec(schema, (err) => {
      if (err) console.log(err.message);
    });
  }

}
