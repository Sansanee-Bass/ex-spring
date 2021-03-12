const db = require('../config/db');



module.exports = {
    getMenu: async function (menuName) {
        let connection = await db.getConnection();
        //SELECT html,link,target FROM menuitem JOIN menu ON menu.menuID = menuitem.menuID WHERE `name` = 'main' ORDER BY sort
        const rows = await connection.query("SELECT html,link,target FROM menuitem JOIN menu ON menu.menuID = menuitem.menuID WHERE `name` = 'main' ORDER BY sort",
            [
                menuName
            ]);
        //console.log(rows.length);
        let data = rows;
        connection.end();
        return data;
    }
}

//         if (rows.length > 0) {
//         } else {

//             return false;
//         }
//     }
// }
