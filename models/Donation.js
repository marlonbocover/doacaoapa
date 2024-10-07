const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  items: {
    type: String,
    required: [true, 'Os itens são obrigatórios.']
  },
  phone: {
    type: String,
    required: [true, 'O telefone é obrigatório.']
  },
  address: {
    type: String,
    required: [true, 'O endereço é obrigatório.']  // Mantém o endereço se ainda for necessário
  }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
