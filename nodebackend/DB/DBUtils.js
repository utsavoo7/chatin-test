const mongoClient = require("mongodb").MongoClient;

let DATABASEName = "League";

let databaseObject;
let DATABASE_URL =
  "mongodb+srv://utsavoo7:16_Mongodb@cluster0.fzmpbe4.mongodb.net/test";

const dbConn = (callback) => {
  mongoClient.connect(DATABASE_URL).then((conn) => {
    databaseObject = conn.db(DATABASEName);
    callback();
  });
};

function getDB() {
  if (databaseObject) {
    return databaseObject;
  }
  throw new Error("An Error connecting the DB!");
}

module.exports = {
  dbConn,
  getDB,
};
