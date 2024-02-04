// Páginas/Clientes.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GerenciarClientes from '../components/Table';

const ClientesContainer = styled.div`
  margin-left: 250px; // A mesma largura da sidebar
  padding: 20px;
  color: #ffffff;
  background-color: #7289da; // Outra cor do Discord
  height: 100vh;
`;

const Clientes = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/');
      const data = await response.json();
      setClients(data);
    }
    fetchData();
  }, []);

  return (
    <ClientesContainer>
    <div>
      <h1>Clientes</h1>
      <GerenciarClientes clients={clients} />
    </div>
    </ClientesContainer>
  );
};

export default Clientes;