export class PostsQueries  {

static getPostsCampaign(idx_campagna){
return `SELECT contenuto, time_stamp FROM ArrayPostItem WHERE idx_campagna='${idx_campagna}'`;
}

static SetPostCampaign(idx_campagna, contenuto, time_stamp){
    return `INSERT INTO ArrayPostItem(
    idx_campagna, contenuto, time_stamp
    ) 
    VALUES(
    '${idx_campagna}','${contenuto}', '${time_stamp}'
    )`;
}
    static DeletePostsCampaign(idx_campagna, time_stamp){
        return `DELETE FROM ArrayPostItem WHERE idx_campagna='${idx_campagna}' AND time_stamp='${time_stamp}'`;
    }
}