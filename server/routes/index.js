const testRoutes = require('./test_routes');
const recipesRoutes = require('./recipes_routes')

module.exports = function(app, db) {
  testRoutes(app, db);
  recipesRoutes(app, db);
  // Other route groups
};
