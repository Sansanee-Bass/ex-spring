const db = require('../config/db');



module.exports = {
    addPage: async function (pageData, userID) {
        let connection = await db.getConnection();

        const res = await connection.query("INSERT INTO `phpsite2`.`page` (`pageKey`, `title`, `content`, `lastUserID`) VALUES (?, ?, ?, ?);",
            [
                pageData.pageKey, pageData.title, pageData.content, userID,
            ]);


        if (res.affectedRows == 1) {
            return true;
        } else {
            return false;
        }

    },

    editPage: async function (pageKey, pageData, userID) {
        let connection = await db.getConnection();
        //UPDATE `page` SET `title`='contact us', `content`='contact info' WHERE  pageKey="contact";
        const rows = await connection.query("UPDATE `page` SET `title`= ?, `content`=?,lastUserID=? WHERE pageKey= ?",
            [
                pageData.title, pageData.content, userID, pageKey
            ]);
        console.log(rows);
        if (rows.affectedRows == 1) {
            return true;

        } else {
            return false;
        }
    },


    getPage: async function (pageKey) {
        let connection = await db.getConnection();
        // SELECT pageID, pageKey, title, content, dateModified FROM`page` WHERE pageKey = 'home'
        const rows = await connection.query("SELECT pageID, pageKey,title,content,dateModified FROM`page` WHERE pageKey = ?",
            [
                pageKey
            ]);
        if (rows[0] == undefined) {
            // to do load home page or return[]
        } else {
            let data = rows[0];
            connection.end();
            return data;
        }
    }
}

