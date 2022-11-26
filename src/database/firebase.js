import {config} from "dotenv";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
const sequelize = require("firestore-sequelize");
const admin = require("firebase-admin");

config();
admin.initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://medidor-d9e02-default-rtdb.firebaseio.com"
})

const db = getDatabase();

sequelize.initializeApp(admin);

module.exports = {
    db
}