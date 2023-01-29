import { defineModel, DataTypes } from "firestore-sequelize";
export const Medicion = defineModel("medicion", {
  corriente: DataTypes.NUMBER,
  energia: DataTypes.STRING,
  factor: DataTypes.NUMBER,
  latitud: DataTypes.STRING,
  longitud: DataTypes.STRING,
  power: DataTypes.STRING,
  temperatura: DataTypes.NUMBER,
  voltaje: DataTypes.NUMBER,
  date: DataTypes.STRING,
  suma: DataTypes.NUMBER,
  id: DataTypes.NUMBER
})
