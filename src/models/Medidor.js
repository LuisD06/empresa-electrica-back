import { defineModel, DataTypes } from "firestore-sequelize";
const Medidor = defineModel("medidor", {
    corriente: DataTypes.NUMBER,
    energia: DataTypes.STRING,
    factor: DataTypes.NUMBER,
    latitud: DataTypes.STRING,
    longitud: DataTypes.STRING,
    power: DataTypes.STRING,
    temperatura: DataTypes.NUMBER,
    voltaje: DataTypes.NUMBER,
    date: DataTypes.STRING,
    suma: DataTypes.NUMBER
})

module.exports = {
    Medidor
}