var api_log = require("./api_log").log;
var api_controller = require("./api_controller");
var restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["*"]
});

var server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(api_log);
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

server.get("/ConsultaTemplate", api_controller.ConsultaTemplate);

server.post("/InserirTemplate",api_controller.InserirTemplate);

server.put("/AlterarTemplate", api_controller.AlterarTemplate);

server.del("/DeletarTemplate", api_controller.DeletarTemplate);

exports.server = server;
