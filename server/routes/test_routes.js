var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/test', (req, res) => {
    res.send({'Test': 'Eureka'});
  })

  app.post('/test/post', (req, res) => {
    const test = req.body;
    db.collection('test').insertOne(test, (err, results) => {
      if (err) {
        res.send({'error': 'An error occurred'});
      } else {
        res.send(results.ops[0]);
      }
    })
  })

}
