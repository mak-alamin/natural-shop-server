const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello From Natural Shop server.");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kdfnv.mongodb.net/natural_shop?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    console.log("DB Connected");

    const productCollection = client.db("natural_shop").collection("products");

    app.get("/products", async (req, res) => {
      let cursor = productCollection.find({});
      let products = await cursor.toArray();
      res.send(products);
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("Listening to http://localhost:" + port);
});
