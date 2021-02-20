const { MongoClient } = require("mongodb");
const { index } = require("./config.db");

const url = "mongodb://127.0.0.1:27017";
const ops = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

class DB {
  static async getConnection(url, ops) {
    const client = new MongoClient(url, ops);
    try {
      await client.connect();
      const database = client.db(index.client);
      const collection = database.collection(index.collection);
      return { collection, client };
    } catch (e) {
      console.error(e);
    }
  }
}

class Methods {
  static async insertOne(doc) {
    const { collection, client } = await DB.getConnection(url, ops);
    try {
      return await collection.insertOne(doc);
    } catch (e) {
      console.error(`Insert One Document in collection profile failure: ${e}`);
    } finally {
      await client.close();
    }
  }

  static async findOne(doc) {
    const { collection, client } = await DB.getConnection(url, ops);
    try {
      return await collection.findOne(doc);
    } catch (e) {
      console.error(`Find One  Document in collection profile failure: ${e}`);
    } finally {
      await client.close();
    }
  }

  static async find(doc) {
    const { collection, client } = await DB.getConnection(url, ops);
    try {
      return await collection.find(doc).toArray();
    } catch (e) {
      console.error(`Find All Document in collection profile failure: ${e}`);
    } finally {
      await client.close();
    }
  }
}

module.exports = { Methods };
