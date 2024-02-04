// Componentes/Sidebar.jsx
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SidebarContainer = styled.div`
  height: 100vh;
  width: 250px; 
  position: fixed;
  background-color: #2c2f33; // Cor do Discord
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled(NavLink)`
  padding: 20px;
  color: #ffffff;
  text-decoration: none;
  &:hover, &.active {
    background-color: #23272a; // Cor ao passar o mouse e para o item ativo
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarItem to="/" exact>Home</SidebarItem>
      <SidebarItem to="/clientes">Clientes</SidebarItem>
      <SidebarItem to="/configuracoes">Configurações</SidebarItem>
    </SidebarContainer>
  );
}

export default Sidebar;
