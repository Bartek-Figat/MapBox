class Index {
  constructor(client = "users", collection = "location") {
    this.client = client;
    this.collection = collection;
  }
}

const index = new Index();

module.exports = { index };
