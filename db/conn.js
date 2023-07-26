const { MongoClient, ServerApiVersion } = require('mongodb');
const Db = process.env.ATLAS_URI;
const password = process.env.ATLAS_PASSOWRD;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

let _db;


module.exports = {
  connectToServer: cb => {
    console.log('Connecting to Atlas...');
    client.connect((err, db) => {
      if (db) {
        _db = db.db('booze-n-vinyl');
        console.log('Connected to Atlas Mongo DB');
        db.on('error', (err2) => {
          console.log('Mongo error:', err2)
        })
      }
      return cb(err)
    });
  },

  getDb: () => _db,

  getDbPromise: () => {
    return new Promise((resolve, reject) => {
      if (_db) { resolve(_db); }
      else {
        const intervalId = setInterval(() => {
          if (_db) {
            clearInterval(intervalId);
            resolve(_db);
          }
        }, 100);
      }
    })
  },

  closeDb: () => {
    client.close();
  }
}



