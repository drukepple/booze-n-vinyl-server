const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
require("dotenv").config({ path: "./config.env" });

async function run() {
  db.connectToServer(console.error);
  const DB = await db.getDbPromise();
  const Collection = () => DB.collection('vinyl');
  const findAll = await Collection().find({})//.toArray(then(res));
  const findAllAry = await findAll.toArray();
  fs.writeFileSync('./vinyl.json', JSON.stringify(findAllAry, null, 4));
  for (const v of findAllAry) {
    v.book = 1;
    // await Collection().updateOne({_id: ObjectId(v._id)}, { $set: v });
    // console.log(`updated ${v.album}`)
  }
  process.exit();
}
run();

