import { defineModel, DataTypes } from "firestore-sequelize";
export const Reporte = defineModel("reporte", {
  id: {
    type: 'string',
    required: true
  },
  cedula: {
    type: 'string',
    required: true
  },
  correo: {
    type: 'string',
    required: true
  },
  direccion: {
    type: 'string',
    required: true
  },
  telefono: {
    type: 'string',
    required: true
  },
  idMedidor: {
    type: 'string',
    required: true
  },
  latlng: {
    type: 'string',
    required: true
  },
  numeroMedidor: {
    type: 'string',
    required: true
  },
  servicio: {
    type: 'string',
    required: true
  },
  tipoMedidor: {
    type: 'string',
    required: true
  },
  suministro: {
    type: 'string',
    required: true
  },
  consumo: {
    type: 'number',
    required: true
  },
  total: {
    type: 'number',
    required: true
  },
  fecha: {
    type: 'string',
    required: true
  }
})
