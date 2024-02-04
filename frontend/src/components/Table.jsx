import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const Thead = styled.thead`
  background-color: #2c2f33;
  color: #ffffff;
  text-align: left;
`;

const Th = styled.th`
  padding: 12px 15px;
  &:hover {
    background-color: #23272a; 
    cursor: pointer;
  }
`;

const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid #192a56; 
  }

  tr:nth-of-type(even) {
    background-color: #343a40;
  }

  tr:last-of-type {
    border-bottom: 2px solid #2c2f33;
  }

  tr:hover {
    background-color: #23272a; 
  }
`;

const Td = styled.td`
  padding: 12px 15px;
  color: #ffffff; 
`;

const Input = styled.input`
  margin-top: 12px;
  padding: 8px;
  width: 98%;
  margin-left: 1%;
  margin-bottom: 20px;
  font-size: 0.9em;
  border-radius: 5px;
  border: 1px solid #192a56; 
  background-color: #2c2f33;
  color: #ffffff; 
  box-sizing: border-box;

  &::placeholder {
    color: #cccccc; 
  }
`;

const TabelaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ id: '', name: '', email: '', phone: '' });
  const [filtro, setFiltro] = useState('');
  const [ordem, setOrdem] = useState('asc');

  // Carregar clientes da API ao montar o componente
  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch('http://localhost:3000/');
      const data = await response.json();
      setClientes(data);
    };

    fetchClientes();
  }, []);

  // Função para adicionar um novo cliente
  const adicionarCliente = async () => {
    // Adicionar lógica de validação ou requisição POST aqui se necessário
    setClientes([...clientes, novoCliente]);
    setNovoCliente({ id: '', name: '', email: '', phone: '' }); // Reset
  };

  // Função para filtrar e ordenar os clientes
  const clientesFiltrados = clientes
    .filter(cliente =>
      Object.values(cliente).some(valor =>
        valor.toString().toLowerCase().includes(filtro.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (a[ordem] < b[ordem]) return -1;
      if (a[ordem] > b[ordem]) return 1;
      return 0;
    });

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar clientes..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <Table>
        <Thead>
          <tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Telefone</Th>
          </tr>
        </Thead>
        <Tbody>
          {clientesFiltrados.map((cliente, index) => (
            <tr key={index}>
              <Td>{cliente.id}</Td>
              <Td>{cliente.name}</Td>
              <Td>{cliente.email}</Td>
              <Td>{cliente.phone}</Td>
            </tr>
          ))}
          <tr>
            <Td>
              <Input
                type="text"
                value={novoCliente.id}
                onChange={(e) => setNovoCliente({ ...novoCliente, id: e.target.value })}
                placeholder="ID"
              />
            </Td>
            <Td>
              <Input
                type="text"
                value={novoCliente.name}
                onChange={(e) => setNovoCliente({ ...novoCliente, name: e.target.value })}
                placeholder="Nome"
              />
            </Td>
            <Td>
              <Input
                type="email"
                value={novoCliente.email}
                onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
                placeholder="E-mail"
              />
            </Td>
            <Td>
              <Input
                type="text"
                value={novoCliente.phone}
                onChange={(e) => setNovoCliente({ ...novoCliente, phone: e.target.value })}
                placeholder="Telefone"
              />
            </Td>
          </tr>
        </Tbody>
      </Table>
      <button onClick={adicionarCliente}>Adicionar Cliente</button>
    </div>
  );
};

export default TabelaClientes;