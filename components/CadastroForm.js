import { useState } from 'react';

export default function CadastroForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    items: '',
    password: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o back-end ou armazenar os dados
    console.log('Dados enviados: ', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Cadastro de Doação</h2>
      <form onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nome" 
          value={formData.name} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Telefone" 
          value={formData.phone} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="address" 
          placeholder="Endereço" 
          value={formData.address} 
          onChange={handleInputChange} 
          required 
        />
        <textarea 
          name="items" 
          placeholder="Itens que deseja doar" 
          value={formData.items} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Senha" 
          value={formData.password} 
          onChange={handleInputChange} 
          required 
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
