var controller = require("./controller");

async function startup() {
  console.log("Iniciando a aplicação");

  try {
    console.log("Iniciando o módulo web server");

    controller.server.listen(process.env.PORT || 19084, function() {
      console.log(
        "%s módulo iniciado em %s",
        controller.server.name,
        controller.server.url
      );
    });
  } catch (err) {
    console.log("Erro ao iniciar api.");
    console.error(err);
    process.exit(1);
  }
}

async function shutdown(e) {
  let err = e;

  console.log("Finalizando a aplicação");
  try {
    console.log("Finalizando o módulo webserver");
    await controller.server.close();
    console.log("módulo webserver finalizado.");
  } catch (e) {
    console.error(e);
    err = err || e;
  }
  console.log("Exiting process");
}

process.on("uncaughtException", err => {
  console.log("Uncaught exception");
  console.error(err);

  controller.server.close(() => {
    startup();
  });
});

startup();
