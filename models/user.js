
const db = require('../config/db');
const crypto = require('crypto');

module.exports = {

    setCookieHash: async function (userID, cookieHash) {
        let connection = await db.getConnection();
        const rows = await connection.query("UPDATE `user` SET cookieHash=? WHERE  userID=?;",
            [
                cookieHash, userID
            ]);
        connection.end();
    },

    authWithCookie: async function (user, cookieHash) {
        let connection = await db.getConnection();
        const rows = await connection.query("SELECT userID,username,passHash,cookieHash,dateModified FROM user WHERE username = ?",
            [
                user
            ]);

        connection.end();

        if (rows[0] === undefined) {
            //login failed (user doesn't exist)
            return { loggedIn: false };
        } else {

            const data = rows[0];
            if (data.cookieHash === cookieHash) {
                data.loggedIn = true;
                return data;
            }

            //login failed (cookie hash doesn't match)
            return { loggedIn: false };
        }
    },

    authWithPass: async function (user, pass) {

        let connection = await db.getConnection();
        const rows = await connection.query("SELECT userID,username,passHash,dateModified FROM user WHERE username = ?",
            [
                user
            ]);

        if (rows[0] === undefined) {
            //login failed (user doesn't exist)
            return { loggedIn: false };
        } else {

            let clientHash = crypto.createHash("sha256").update(pass).digest("base64");
            //console.log(clientHash);
            let data = rows[0];
            connection.end();
            //console.log("user", clientHash, data.passHash); 

            if (data.passHash === clientHash) {
                let cookieHash = crypto.createHash("sha256").update((new Date()).getTime() + "").digest("base64");
                this.setCookieHash(data.userID, cookieHash);

                data.loggedIn = true;
                data.cookieHash = cookieHash;
                return data;

            } else {
                //login failed (password incorrect)
                return { loggedIn: false };
            }




        }
    }
}