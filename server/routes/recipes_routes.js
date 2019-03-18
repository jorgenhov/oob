var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //search for recipe title
  app.get('/recipe/spesific/:title', (req, res) => {
    const title = req.params.title;
    const details = {'title': {$regex : title}};
    //change collection!
    db.collection('test').find(details, (err, results) => {
      if(err) {
        res.send({'error': 'An error occurred'});
      } else {
        res.send(results);
      }
    })
  })

  //return spesific recipes by id
  app.get('/recipe/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id) };
    //change collection!
    db.collection('test').findOne(details, (err, result) => {
      if(err) {
        res.send({'error': 'An error occurred'});
      } else {
        res.send(result);
      }
    })
  })

  //return all recipes
  app.get('/recipe/all', (req, res) => {
    //change collection!
    db.collection('test').find({}).toArray(function (err, results) {
      if(err) {
        res.send({'error': 'An error occurred'});
      } else {
        res.send(JSON.stringify(results));
      }
    })
  })

  //add recipe
  app.post('/recipe/add', (req, res) => {
    const recipe = req.body;
    if(recipe.title && recipe.fields && recipe.desc) {
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
