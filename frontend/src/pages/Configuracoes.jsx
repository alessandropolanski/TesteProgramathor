// Páginas/Clientes.jsx
import React from 'react';
import styled from 'styled-components';

const ConfiguracoesContainer = styled.div`
  margin-left: 250px; // A mesma largura da sidebar
  padding: 20px;
  color: #ffffff;
  background-color: #7289da; // Outra cor do Discord
  height: 100vh;
`;

function Configuracoes() {
  return (
    <ConfiguracoesContainer>
      Bem-vindo página de Configuracoes
    </ConfiguracoesContainer>
  );
}

export default Configuracoes;
