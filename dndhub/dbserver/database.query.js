import { Database } from "./database.js";

export class QueryType {
  static get GET() { return "GET"; }
  static get ALL() { return "ALL"; }
  static get EXEC() { return "EXEC"; }
  static get RUN() { return "RUN"; }
}

export class Query {

  errorCallback = (_) => {};
  successCallback = (row) => {};
  type = "<INVALID>";
  query = "";

  constructor(type, query) {
    this.type = type;
    this.query = query;
  }

  static from(type, query) {
    return new Query(type, query);
  }

  orElse(callback) {
    this.errorCallback = callback;
    return this;
  }

  andThen(callback) {
    this.successCallback = callback;
    return this;
  }
  
  get(other = undefined) {
    let result = other;

    const GET = (err, row) => {
      if(err !== undefined || err !== null) {
        this.errorCallback(err);
      } else {
        this.successCallback(row);
        result = row;
      }
    };

    const ALL = (err, rows) => {
      if(err !== undefined || err !== null) {
        this.errorCallback(err);
      } else {
        this.successCallback(rows);
        result = rows;
      }
    };

    const EXEC = (err) => {
      if(err !== undefined || err !== null) {
        this.errorCallback(err);
      } else this.successCallback();
    };

    const RUN = (err) => {
      if(err !== undefined || err !== null) {
        this.errorCallback(err);
      } else this.successCallback();
    };

    if(this.type === QueryType.GET) {
      Database.INSTANCE.get(this.query, GET);
    } else if(this.type === QueryType.ALL) {
      Database.INSTANCE.all(this.query, ALL);        
    } else if(this.type === QueryType.EXEC) {
      Database.INSTANCE.exec(this.query, EXEC);
    } else if(this.type === QueryType.RUN) {
      Database.INSTANCE.run(this.query, RUN);
    } else { 
      throw new Error(`Invalid query type ${this.type}.`);
    }

    return result;
  }
}