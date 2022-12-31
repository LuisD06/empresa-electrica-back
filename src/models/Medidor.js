import { defineModel, DataTypes } from "firestore-sequelize";
const Medidor = defineModel("medidor", {
    id: {
        type: 'string',
        required: true
    },
    numero: {
        type: 'string',
        required: true
    },
    tipo: {
        type: 'string',
        required: true
    },
    servicio: {
        type: 'string',
        required: true
    },
    suministro: {
        type: 'string',
        required: true
    },
    lat: {
        type: 'string'
    },
    lng: {
        type: 'string'
    },
    usuario: {
        type: 'string'
    },
    status: {
        type: 'string'
    }
})

module.exports = {
    Medidor
}