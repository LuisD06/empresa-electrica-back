import { defineModel, DataTypes } from "firestore-sequelize";
const Medidor = defineModel("medidor", {
    corriente: DataTypes.NUMBER,
    energia: DataTypes.STRING,
    factorPotencia: DataTypes.NUMBER,
    latitud: DataTypes.STRING,
    longitud: DataTypes.STRING,
    power: DataTypes.STRING,
    temperatura: DataTypes.NUMBER,
    voltaje: DataTypes.NUMBER,
    date: DataTypes.STRING
})

module.exports = {
    Medidor
}