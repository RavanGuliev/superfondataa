const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db/db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

// CORS-u aktiv et
server.use(cors());

// Default middleware-ləri əlavə et
server.use(middlewares);

// JSON Server router-i əlavə et
server.use(router);

// Dinləmə (local üçündür, Vercel üçün lazım deyil amma saxlamaq olar)
server.listen(3000, () => {
  console.log('JSON Server is running');
});

module.exports = server; // Vercel üçün export
