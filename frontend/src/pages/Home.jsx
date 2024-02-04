// Dentro do seu componente Home ou qualquer outro componente
import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import { styled } from 'styled-components';

const StyledHomeContainer = styled.div`
  margin-left: 250px; // A mesma largura da sidebar
  padding: 20px;
  height: calc(100vh - 40px); // 100% da altura da viewport menos o padding
  width: calc(100vw - 250px - 40px); // Largura da viewport menos a sidebar e padding
  position: relative; // Para que o MapContainer preencha todo o espaço
`;

const Home = () => {
  const [clients, setClients] = useState([]); // para os marcadores dos clientes
  const [route, setRoute] = useState([]); // para as coordenadas da polyline

  useEffect(() => {
    async function fetchRouteAndClients() {
      // Fetch da rota
      const routeResponse = await fetch('http://localhost:3000/teste/rota');
      const routeData = await routeResponse.json();
      setRoute(routeData.coordinates);
      console.log(routeData)

      // Fetch dos clientes
      const clientsResponse = await fetch('http://localhost:3000/');
      const clientsData = await clientsResponse.json();
      console.log(clientsData)

      setClients(clientsData);
    }
  
    fetchRouteAndClients();
  }, []);

  return (
    <StyledHomeContainer>
      {/* Passe a rota e os clientes para o componente Map */}
      <Map clients={clients} route={route} />
    </StyledHomeContainer>
  );
};

export default Home;