const defineModel = require( "firestore-sequelize").defineModel;
const DataTypes = require("firestore-sequelize").DataTypes;
const Medicion = defineModel("medicion", {
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
  id: DataTypes.NUMBER,
  medidorId: DataTypes.STRING
})
module.exports = {
  Medicion
}
