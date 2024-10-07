const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true, // Telefone é obrigatório
  },
  email: {
    type: String,
    required: true, // E-mail é obrigatório
    unique: true, // E-mails únicos para cada ONG
  },
  description: {
    type: String, // Descrição da ONG
  },
});

const Ngo = mongoose.model('Ngo', ngoSchema);

module.exports = Ngo;
