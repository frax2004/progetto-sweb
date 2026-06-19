import sqlite3 from 'sqlite3';
import fs from 'fs';
import { DatabasePaths } from './database.paths.js';

const sql = sqlite3.verbose();

export class Database {
  static __DB__ = new sql.Database(DatabasePaths.DATABASE, (err) => {
    if(err) console.log(err.message);
  });
  
  static get INSTANCE() {
    return Database.__DB__;
  }

  static queryOne(query) {
    return new Promise((resolve, reject) => {
      Database.INSTANCE.get(query, (err, row) => {
        if(err !== null) reject(err);
        else resolve(row);
      });
    });
  }

  static queryAll(query) {
    return new Promise((resolve, reject) => {
      Database.INSTANCE.all(query, (err, rows) => {
        if(err !== null) reject(err);
        else resolve(rows);
      });
    });
  }

  static execOne(query) {
    return new Promise((resolve, reject) => {
      Database.INSTANCE.run(query, err => {
        if(err !== null) {
          reject(err);
        } else resolve(err);
      });
    });
  }

  static execAll(query) {
    return new Promise((resolve, reject) => {
      Database.INSTANCE.exec(query, err => {
        if(err !== null) {
          reject(err);
        } else resolve(err);
      });
    });
  }

  static async load(schemaPath) {
    const schema = fs.readFileSync(schemaPath, 'utf8');

    
    await Database.execAll(schema, (err) => {
      if(err) console.log(err.message);
    });

  }

}
