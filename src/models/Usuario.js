import { defineModel, DataTypes } from "firestore-sequelize";
const Usuario = defineModel("usuario", {
    id: {
        type: DataTypes.STRING,
        required: true
    },
    nombre: {
        type: DataTypes.STRING,
        required: true
    },
    cedula: {
        type: DataTypes.STRING,
        required: true,
        default: false
    },
    direccion: {
        type: DataTypes.STRING,
        required: true
    },
    correo: {
        type: DataTypes.STRING,
        required: true
    },
    telefono: {
        type: DataTypes.STRING,
        required: true
    },
    tipo: {
        type: DataTypes.STRING,
        required: true  
    },
    clave: {
        type: DataTypes.STRING,
        required: true
    },
})

module.exports = {
    Usuario
}