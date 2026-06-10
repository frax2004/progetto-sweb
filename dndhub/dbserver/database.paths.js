
export class DatabasePaths {
  static get DATABASE() {
    return "./database/dndhub.db";
  }

  static get SCHEMAS() {
    return "./schemas/DatabaseSchemas.sql";
  }

  static get DATA_DIR() {
    return "./models/data/";
  }

  static get MOCK_DATA_DIR() {
    return "./models/mock-data/";
  }
}