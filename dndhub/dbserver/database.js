import sqlite3 from 'sqlite3';
import fs from 'fs';
import { Query, QueryType } from './database.query.js';
import { DatabasePaths } from './database.paths.js';

const sql = sqlite3.verbose();

export class Database {
  static __DB__ = new sql.Database(DatabasePaths.DATABASE, (err) => {
    if(err) console.log(err.message);
  });
  
  static get INSTANCE() {
    return Database.__DB__;
  }

  static loadSchema(schemaPath) {
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Query
    // .from(QueryType.EXEC, schema)
    // .orElse((err) => { if(err) console.log(err.message); })
    // .get();

    Database.INSTANCE.exec(schema, (err) => {
      if (err) console.log(err.message);
    });
  }

}
