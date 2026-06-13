import { Database } from "../database.js";

export class PostsDB {
  
  static async getPostsByCampaignId(campaignId) {
    return Database.queryAll(
      `SELECT * 
       FROM ArrayPostItem 
       WHERE idx_campagna = '${campaignId}'
       ORDER BY time_stamp DESC`
    );
  }

  static async insertPost(campaignId, timestamp, content) {
    return Database.queryAll(
      `INSERT INTO ArrayPostItem (idx_campagna, time_stamp, contenuto)
       VALUES ('${campaignId}', '${timestamp}', '${content}')`
    );
  }

  static async campaignExists(campaignId) {
    const res = await Database.queryAll(
      `SELECT idx_campagna 
       FROM Campagna 
       WHERE idx_campagna = '${campaignId}'`
    );

    return res.length > 0;
  }
}