const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Faylları oxuyub birləşdir:
const path = require('path');
const base = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));
const bestsellers = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'bestsellers.json'))).bestsellers.data.items;
const newData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'new.json'))).new.data.items;

// Runtime-da birləşdir:
const combinedData = {
  ...base,
  bestsellers,
  new: newData
};

// Router-ə dinamik olaraq yüklə:
const router = jsonServer.router(combinedData);
server.use(router);

module.exports = server;
