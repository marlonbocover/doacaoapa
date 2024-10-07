const { MongoClient } = require('mongodb'); // Apenas uma declaração

async function main() {
    const uri = "mongodb://localhost:27017"; // URL do MongoDB local
    const client = new MongoClient(uri);

    try {
        // Conectar ao servidor MongoDB
        await client.connect();
        console.log("Conectado ao MongoDB!");

        // Definir o banco de dados e coleções
        const database = client.db('projeto_doador');  // Nome do banco de dados
        const usuariosCollection = database.collection('usuarios'); // Coleção de usuários

        // Inserir um documento de exemplo
        await usuariosCollection.insertOne({
            nome: "João da Silva",
            telefone: "99999-1234",
            endereco: "Rua Exemplo, 123",
            tipo_usuario: "doador"
        });

        console.log("Usuário inserido com sucesso!");
    } finally {
        // Fechar a conexão
        await client.close();
    }
}

main().catch(console.error);

// Exporta a função main
module.exports = main;
