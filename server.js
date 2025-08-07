const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Faylları oxuyuruq
const basePath = path.join(__dirname, 'db');

const base = JSON.parse(fs.readFileSync(path.join(basePath, 'db.json')));
const bestsellers = JSON.parse(fs.readFileSync(path.join(basePath, 'bestsellers.json'))).bestsellers.data.items;
const newData = JSON.parse(fs.readFileSync(path.join(basePath, 'new.json'))).new.data.items;

// Birləşdiririk
const combinedData = {
  ...base,
  bestsellers,
  new: newData
};

// Router yaradırıq
const router = jsonServer.router(combinedData);

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
