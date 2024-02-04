const clientModel = require('../model/client')
const axios = require('axios');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientModel.getClients();
    res.json(clients)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientModel.getClientById(id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const newClient = await clientModel.createClient(req.body);
    res.status(201).json(newClient)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClient = await clientModel.updateClient(id, req.body);
    if (updatedClient) {
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await clientModel.deleteClient(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoute = async (req, res) => {
  try {
    const clients = await clientModel.getClients();
    const locations = clients.map(client => [client.x_coordinate, client.y_coordinate]);

    const route = await calculateRoute(locations);

    res.json(route.features[0].geometry); // Envia a rota calculada para o frontend
  } catch (error) {
    console.error('Erro ao obter a rota:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const calculateRoute = async (locations) => {
  const apiKey = '5b3ce3597851110001cf6248eed6e44a37fe4597b34e974bf3205937';
  const url = `https://api.openrouteservice.org/v2/directions/driving-car/geojson`;

  try {
    const response = await axios.post(url, {
      coordinates: locations,
      profile: 'driving-car',
      format: 'geojson'
    }, {
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });

    return response.data; // O corpo da resposta contém a rota geojson
  } catch (error) {
    console.error('Erro ao calcular a rota:', error.response.data);
    throw error;
  }
};

// Uso:
// calculateRoute([[8.681495,49.41461], [8.686507,49.41943]])
// .then(data => console.log(data))
// .catch(error => console.error(error));

