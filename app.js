const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const Donor = require('./models/Donor');
const Donation = require('./models/Donation');
const Ngo = require('./models/Ngo');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conectar ao MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/projeto_doador', {});
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB', err);
    }
};
connectToDatabase();

// Rota para a página principal (formulário de cadastro de doadores)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para o formulário de doações
app.get('/donationForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donationForm.html'));
});

// Rota para a página principal (login)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para adicionar um doador
app.post('/donors', async (req, res) => {
    const { name, phone, street, number, neighborhood, city, state, password } = req.body;
    try {
        const existingDonor = await Donor.findOne({ phone });
        if (existingDonor) {
            return res.status(400).json({ message: 'Número de telefone já cadastrado.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Concatenando o endereço completo
        const address = `${street}, ${number}, ${neighborhood}, ${city}, ${state}`;

        const donor = new Donor({ name, phone, address, password: hashedPassword });
        await donor.save();
        res.status(201).json({ message: 'Doador cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar doador:', error);
        res.status(400).json({ message: 'Erro ao cadastrar doador.' });
    }
});

// Lista de doadores.

app.get('/donorsList', async (req, res) => {
    try {
        const donors = await Donor.find(); // Recupera todos os doadores do banco de dados
        res.render('donors', { donors }); // Renderiza o arquivo donors.ejs passando a lista de doadores
    } catch (error) {
        console.error('Erro ao listar doadores:', error);
        res.status(500).send('Erro ao listar doadores.');
    }
});


// Rota para listar todas as doações
app.get('/donationList', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.render('donationList', { donations });
    } catch (error) {
        console.error('Erro ao listar doações:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para adicionar uma doação
app.post('/registerDonation', async (req, res) => {
    const { items, phone, deliveryOption } = req.body; 
    console.log(req.body);


    // Verificação dos campos obrigatórios
    if (!items || !phone) {
        return res.status(400).json({ message: 'Itens e telefone são obrigatórios.' });
    }

    try {
        let address;

        // Se a opção de entrega for "Sim", usar o endereço da APA
        if (deliveryOption === 'sim') {
            address = "Av. José João Muraro, 558 - Jardim Porto Alegre, Toledo - PR";
        } else {
            address = "Endereço não especificado"; // Defina um endereço padrão ou deixe em branco
        }

        // Criação da nova doação com os dados recebidos
        const donation = new Donation({
            items,
            phone,
            address
        });

        // Salvando a doação no banco de dados
        await donation.save();  // Certifique-se que essa linha esteja dentro da função async

        // Retornando resposta de sucesso
        res.status(201).json({ message: 'Doação cadastrada com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar doação:', error);
        res.status(500).json({ message: 'Erro ao cadastrar doação.' + error.message });
    }
});



// Rota para realizar login
app.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        const donor = await Donor.findOne({ phone });
        if (!donor) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const isPasswordValid = await bcrypt.compare(password, donor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para adicionar uma ONG
app.post('/ngos', async (req, res) => {
    const { name, address } = req.body;
    try {
        const ngo = new Ngo({ name, address });
        await ngo.save();
        res.status(201).json({ message: 'ONG cadastrada com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar ONG:', error);
        res.status(400).send('Erro ao cadastrar ONG.');
    }
});

// Rota para listar todas as ONGs
app.get('/ngos', async (req, res) => {
    try {
        const ngos = await Ngo.find();
        res.status(200).send(ngos);
    } catch (error) {
        console.error('Erro ao listar ONGs:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
