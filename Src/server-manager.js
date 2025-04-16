const express = require('express');
const { PterodactylAPI } = require('pterodactyl-api');
const config = require('../config/pterodactyl.json');

const app = express();
const api = new PterodactylAPI(config.url, config.api_key);

app.get('/create-server', async (req, res) => {
  // Logic to create a server using Pterodactyl API
});

app.listen(3000, () => {
  console.log('GameHoster is running on port 3000');
});