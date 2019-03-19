var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //returns everything from selected category
  app.get('/api/recipe/category/:category', (req, res) => {
    const category = req.params.category;
    const details = {'category': { '$regex' : category, '$options': 'i'}};
    //change collection
    db.collection('test').find(details).toArray(function (err, results) {
      if(err) {
        res.send({'error': 'An error occurred'});
      } else {
        res.send(JSON.stringify(results));
      }
    })
  })

  //search for recipe title
  app.get('/api/recipe/title/:title', (req, res) => {
    const title = req.params.title;
    const details = {'title': { '$regex' : title, '$options' : 'i' }};
    //change collection!
    db.collection('test').find(details).toArray(function (err, results) {
      if(err) {
        res.send({'error': 'An error occurred'});
      } else {
        res.send(JSON.stringify(results));
      }
    })
  })

  //return spesific recipes by id
  app.get('/api/recipe/id/:id', (req, res) => {
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
  app.get('/api/recipe/all', (req, res) => {
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
  app.post('/api/recipe/add', (req, res) => {
    const recipe = req.body;
    if(recipe.category && recipe.title && recipe.fields && recipe.desc) {
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
