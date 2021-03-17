const db = require('../config/db');

module.exports = {
    addEntry: async function (userID, entry) {
        let connection = await db.getConnection();
        //SELECT `reviewId`, `title`, `userId`, `content`, `dateAdded` FROM `phpsite2`.`review` ORDER BY `dateAdded` LIMIT 10
        const rows = await connection.query("INSERT INTO `phpsite2`.`review` (`title`, `userId`, `content`) VALUES (?, ?, ?)",
            [
                entry.title, userID, entry.content
            ]);


        let data = rows;
        connection.end();

        if (rows.length > 0) {
            return data;
        } else {
            return false;
        }
    },

    getEntries: async function (row, perPage) {
        let connection = await db.getConnection();
        //SELECT `reviewId`, `title`, `userId`, `content`, `dateAdded` FROM `phpsite2`.`review` ORDER BY `dateAdded` LIMIT 10
        // const rows = await connection.query("SELECT `reviewId`, `title`,username, user.userId, `content`, `dateAdded` FROM `phpsite2`.`review` JOIN `user` ON `user`.userID = review.userId Order BY `dateAdded` DESC LIMIT 10");
        if (row === undefined) {
            row = 0;
        };
        if (perPage === undefined) {
            perPage = 5;
        };

        let startRow = row * perPage;
        const rows = await connection.query("SELECT `reviewId`, `title`,username, user.userId, `content`, `dateAdded` FROM `phpsite2`.`review` JOIN `user` ON `user`.userID = review.userId Order BY `dateAdded` DESC LIMIT ?,?",
            [
                startRow, startRow + perPage
            ]);
        const rowCount = await connection.query("SELECT COUNT(reviewId) AS rowTotal FROM `review`");
        // console.log(rowCount[0].rowTotal)
        let data = { rows: rows, rowCount: rowCount[0].rowTotal };
        connection.end();

        if (rows.length > 0) {
            return data;
        } else {
            return false;
        }
    }
}


