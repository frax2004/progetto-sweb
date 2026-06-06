export class CommonQueries {
    static getAllFromArrayAPIReference (id) {
        return `SELECT * FROM ArrayAPIReference WHERE array_id = ${id}`;
    }
}