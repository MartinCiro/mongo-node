const { MongoClient, ObjectId } = require("mongodb");
const config = require("./config");

const client = new MongoClient(
  `mongodb://${config.UserDB}:${config.PasswordBD}@${config.ServerDB}:${config.PortDB}/${config.Database}?authSource=${config.UserDB}`
);

async function getConnection() {
  await client.connect();
  return client.db(config.Database);
}

module.exports = {
  getConnection,
};

/* db.createUser({
    user: "admin",
    pwd: "root",
    roles: [
      { role: "root", db: "admin" }
    ]
  }) */
