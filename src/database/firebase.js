const config = require("dotenv")
const initializeApp = require("firebase-admin/app").initializeApp
const applicationDefault = require("firebase-admin/app").applicationDefault
const getDatabase = require("firebase-admin/database")

const sequelize = require("firestore-sequelize");
const admin = require("firebase-admin");

config.config();
admin.initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://medidor-d9e02-default-rtdb.firebaseio.com"
})

const db = getDatabase.getDatabase();

sequelize.initializeApp(admin);

module.exports = {
    db
}