const http = require("http");
const app = require("./app");

// run the app on 3000 prot#
const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port);
