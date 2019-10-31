const config = require("./api_config.js");
const queriesCql = require("./api_cql");
const neo4j = require("neo4j-driver").v1;

//
// Método privado genérico para execução de cypher query.
//
async function executeCypherAsync(cql) {
  try {
    let driver = neo4j.default.driver(
      config.neo4j_driver.url_bold,
      config.neo4j_driver.auth,
      { disableLosslessIntegers: true }
    );
    let session = driver.session();
    var result = await session.run(cql, null);

    session.close();
    driver.close();

    return result.records[0]._fields[0];
  } catch (err) {
    console.log(err);
    session.close();
    driver.close();
  }
}

//
// Método para Consulta Template.
//
exports.ConsultaTemplate = async function(req, res, next){
  try {

    var cqlQuery = queriesCql.cql.sqlExampleQuery;
    var retornoBase = await executeCypherAsync(cqlQuery);

    res.send(retornoBase);
  } catch (err) {
    res.send(err);
  }

  next();
};

//
// Método para Inserir Template.
//
exports.InserirTemplate = async function(req, res, next){
  try {

    var jsonBody = req.body || {};

    if (typeof jsonBody === "string") jsonBody = JSON.parse(jsonBody);

    var cqlQuery = queriesCql.cql.incluirQuery;
    cqlQuery = cqlQuery.replace("@o_que", jsonBody.o_que  );
    cqlQuery = cqlQuery.replace("@URL", jsonBody.urlResourceApi);
    cqlQuery = cqlQuery.replace("@queueName", jsonBody.queueName);

    var retorno = await executeCypherAsync(cqlQuery);

    jsonBody.id = retorno[0]._fields[0].id;

    res.send(jsonBody);
    
  } catch (err) {
    var retornoErro = {
      Status: 'Erro ao Inserir Template',
      erro: err
    }
    res.send(retornoErro);
  }

  next();
};

//
// Método para Alterar Template.
//
exports.AlterarTemplate = async function(req, res, next){
  try {

    var jsonBody = req.body || {};

    if (typeof jsonBody === "string") jsonBody = JSON.parse(jsonBody);

    var cqlQuery = queriesCql.cql.alterarQuery;
    cqlQuery = cqlQuery.replace("@ID", jsonBody.id);
    cqlQuery = cqlQuery.replace("@o_que", jsonBody.o_que);
    cqlQuery = cqlQuery.replace("@URL", jsonBody.urlResourceApi);
    cqlQuery = cqlQuery.replace("@queueName", jsonBody.queueName);

    await executeCypherAsync(cqlQuery);

    res.send(jsonBody);
    
  } catch (err) {
    var retornoErro = {
      Status: 'Erro ao Alterar Template',
      erro: err
    }
    res.send(retornoErro);
  }

  next();
};

//
// Método para Deletar Template.
//
exports.DeletarTemplate = async function(req, res, next){
  try {
    var jsonBody = req.body || {};

    if (typeof jsonBody === "string") jsonBody = JSON.parse(jsonBody);

    var cqlQuery = queriesCql.cql.deletarQuery;
    cqlQuery = cqlQuery.replace("@ID", jsonBody.id);

    await executeCypherAsync(cqlQuery);

    jsonBody.Status = 'Registro Deletado';

    res.send(jsonBody);
    
  } catch (err) {
    res.send(err);
  }

  next();
};
