const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

module.exports = function crudRoute(router, basePath, collection, createObject, sort={}) {
  const Collection = () => db.getDb().collection(collection);

  router.route(basePath).get((req, res) => {
    console.log(`getting all ${basePath}`);
    Collection().find({}).sort(sort).toArray(then(res));
  });

  router.route(`${basePath}/:id`).get((req, res) => {
    console.log(`get ${basePath} by id: ${req.params.id}`);
    Collection().findOne(qryById(req), then(res));
  });

  router.route(basePath).post((req, res) => {
    console.log(`Post ${basePath}`, req.body);
    const newObj = createObject(req);
    Collection().insertOne(newObj, then(res));
  });

  router.route(`${basePath}/:id`).patch((req, res) => {
    console.log(`Patch ${basePath}`, req.params.id);
    const updateObj = createObject(req);
    console.log(updateObj);
    Collection().updateOne(qryById(req), { $set: updateObj }, then(res));
  });

  router.route(`${basePath}/:id`).delete((req, res) => {
    console.log(`Deleting ${basePath}`);
    Collection().deleteOne(qryById(req), then(res));
  });

}



function then(response) {
  return function (err, result) {
    // console.log(result)
    if (err) throw err;
    response.json(result);
  }
}
function qryById(request) {
  return { _id: ObjectId(request.params.id) }
}
