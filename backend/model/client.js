const pool = require('../config/dbConfig');

const getClients = async () => {
  const query = 'SELECT * FROM clients';
  try {
    const clients = await pool.query(query);
    return clients.rows;
  } catch (error) {
    throw error;
  }
};

const getClientById = async (id) => {
  const query = 'SELECT * FROM clients WHERE id = $1';
  try {
    const client = await pool.query(query, [id]);
    return client.rows[0];
  } catch (error) {
    throw error;
  }
}

const createClient = async (clientData) => {
  const { name, email, phone, x_coordinate, y_coordinate } = clientData;
  const query = 'INSERT INTO clients (name, email, phone, x_coordinate, y_coordinate) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  try {
    const newClient = await pool.query(query, [name, email, phone, x_coordinate, y_coordinate]);
    return newClient.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateClient = async (id, clientData) => {
  const { name, email, phone, x_coordinate, y_coordinate } = clientData;
  const query = 'UPDATE clients SET name = $1, email = $2, phone = $3, x_coordinate = $4, y_coordinate = $5 WHERE id = $6 RETURNING *';
  try {
    const updatedClient = await pool.query(query, [name, email, phone, x_coordinate, y_coordinate, id]);
    return updatedClient.rows[0];
  } catch (error) {
    throw error
  }
};

const deleteClient = async (id) => {
  const query = 'DELETE FROM clients WHERE id = $1';
  try {
    await pool.query(query, [id]);
    return { message: 'Client deleted successfully.' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
