const db = require('./index');


class dbDriver {

    async getCategories(input) {
        const get_categories = 'SELECT * FROM categories ORDER BY id';

        const categoryReq = await db.query(get_categories);
        const categories = categoryReq.rows;
        return categories;
    }

    async getItems() {
        const get_inventory = 'SELECT * FROM inventory ORDER BY id';

        const itemReq = await db.query(get_inventory);
        const items = itemReq.rows;
        return items;
    }

    async addCategory(name, description, seasonal) {
        const sql_insert_inventory = `INSERT INTO categories (name, description, seasonal) VALUES
        ($1, $2, $3) RETURNING *;`;
        const values = [name, description, seasonal]

        const catAddReq = await db.query(sql_insert_inventory, values);
        const catAdd = catAddReq.rows;
        return catAdd;

        /*
        db
            .query(sql_insert_inventory, values)
            .then(res => {
                return (res.rows)
            })
            .catch(e => {
                console.log(e.message);
                return e.message;
            })
        */
    }

}



const repoInstance = new dbDriver();
module.exports = repoInstance;