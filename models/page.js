const db = require('../config/db');



module.exports = {
    getPage: async function (pageKey) {
        let connection = await db.getConnection();
        // SELECT pageID, pageKey, title, content, dateModified FROM`page` WHERE pageKey = 'home'
        const rows = await connection.query("SELECT pageID, pageKey,title,content,dateModified FROM`page` WHERE pageKey = ?",
            [
                pageKey
            ]);

        let data = rows[0];
        connection.end();
        return data;
    }


}
