import { Injectable } from "@angular/core";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'

const dbname = 'dbserver';

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  constructor() {}

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(
      dbname,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();
  }
}