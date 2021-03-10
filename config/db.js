
const mariadb = require('mariadb');
const secrets = require('./secrets');



module.exports = {
    connected: false,

    init: function () {

        if (!this.connected) {
            try {
                this.pool = mariadb.createPool(secrets.database);
                this.connected = true;
            } catch (err) {
                console.log(err);
            }
        }
    },
    getConnection: async function () {
        if (this.connected) {
            return await this.pool.getConnection();
        } else {
            console.log("Database not Connected");
        }

    }
}



//module.exports = pool;