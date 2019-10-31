exports.cql = {
  sqlExampleQuery: 
    `MATCH (n:EventoTemplate) RETURN collect(properties(n))`,

  incluirQuery: 
    `CREATE (e0:EventoTemplate{o_que: '@o_que', urlResourceApi:'@URL', queueName: '@queueName' })
    RETURN {id:id(e0), labels: labels(e0), data: e0}`,

  alterarQuery: 
    `MATCH (n:EventoTemplate) where id(n)=@ID
    SET n = {o_que: '@o_que', queueName:'@URL', urlResourceApi:'@queueName'} 
    RETURN n`,

  deletarQuery:
  `MATCH (n:EventoTemplate) where id(n)=@ID DELETE n`
};
