const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();

// CORS konfiqurasiyası
server.use(cors({
    origin: "*", // istəsən bura konkret origin də yaza bilərsən
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

server.use(middlewares);

// Rewrite qaydası
server.use(
    jsonServer.rewriter({
        "./*": "/$1",
    })
);

server.use(router);

server.listen(5174, () => {
    console.log("JSON Server is running on port 5174");
});

// Export the Server API
module.exports = server;
