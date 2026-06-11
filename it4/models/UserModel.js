const db = require('../db')

//razred User enkapsulira korisnika web trgovine
module.exports = class User {

    //konstruktor korisnika
    //id je undef jer ga dodjeluje bp pohranom, pa ga saznamo citanjem iz baze
    constructor(username, first_name, last_name, email, password, role = "user") {
        this.id = undefined
        this.user_name = username
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.password = password
        this.role = role
    }

    //dohvat korisnika na osnovu korisničkog imena (email kod signup procedure)
    static async fetchByUsername(username) {

        let results = await dbGetUserByName(username)
        let newUser = new User()

        if (results.length > 0) {
            newUser = new User(results[0].user_name, results[0].first_name,
                results[0].last_name, results[0].email, results[0].password, results[0].role)
            newUser.id = results[0].id
        }
        return newUser
    }

    //dohvat korisnika na osnovu id korisnika (tablica users)
    static async fetchByUserId(id) {

        let results = await dbGetUserById(id)
        let newUser = new User()

        if (results.length > 0) {
            newUser = new User(results[0].user_name, results[0].first_name,
                results[0].last_name, results[0].email, results[0].password, results[0].role)
            newUser.id = results[0].id
        }
        return newUser
    }

    //static provjera jesu li dvije sifre jednake
    static checkPasswordS(password1, password2) {
        let res = password1 ? password1 == password2 : false
        return res
    }

    //da li je korisnik pohranjen u bazu podataka?
    isPersisted() {
        return this.id !== undefined
    }

    //provjera zaporke
    checkPassword(password) {
        return this.password ? this.password == password : false
    }

    //pohrana korisnika u bazu podataka
    async persist() {
        try {
            let userID = await dbNewUser(this)
            this.id = userID
        } catch (err) {
            console.log("ERROR persisting user data: " + JSON.stringify(this))
            throw err
        }
    }

}

//dohvat korisnika iz baze podataka na osnovu korisničkog imena (stupac user_name)
dbGetUserByName = async (user_name) => {
    const sql = `SELECT id, user_name, first_name, last_name, email, password, role
    FROM users WHERE user_name = '` + user_name + `'`; //direktno ukljucivanje argova radi, ali nije sigurno
    try {
        const result = await db.query(sql, []); //string with wildcards ($1) and a list of args
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

//dohvat korisnika iz baze podataka na osnovu id korisnika (stupac id)
dbGetUserById = async (user_id) => {
    const sql = `SELECT id, user_name, first_name, last_name, email, password, role
    FROM users WHERE id = ` + user_id;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

//umetanje zapisa o korisniku u bazu podataka
dbNewUser = async (user) => {
    const sql = "INSERT INTO users (user_name, first_name, last_name, email, password, role) VALUES ('" +
        user.user_name + "', '" + user.first_name + "', '" + user.last_name + "', '" +
        user.email + "', '" + user.password + "', '" + user.role + "') RETURNING id";
    try {
        const result = await db.query(sql, []);
        return result.rows[0].id; //vracanje id-a kojeg je dodjelila baza (vraca se n-torka radi RETURNING)
    } catch (err) {
        console.log(err);
        throw err
    }
}