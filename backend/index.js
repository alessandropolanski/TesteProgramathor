require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());

const clientRoutes = require('./routes/client');

app.use('/', clientRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
