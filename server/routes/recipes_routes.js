var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.post('/recipe/add', (req, res) => {
    const recipe = req.body;
    if(recipe.title && recipe.field1 && recipe.desc) {
      //change collection!
      db.collection('test').insertOne(recipe, (err, results) => {
        if(err){
          res.send({'error': 'An error occurred'});
        } else {
          res.send(results.ops[0]);
        }
      })
    } else {
      res.send({'error': 'Required field(s) missing.'})
    }
  })

}
