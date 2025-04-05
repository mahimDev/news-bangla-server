require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@newsbangla.k7ko6y9.mongodb.net/?retryWrites=true&w=majority&appName=newsBangla`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const dataBase = await client.db("newsBangla");
    const newsCollection = dataBase.collection("news");
    app.get("/", (req, res) => {
      res.send("Welcome to news bangla");
    });
    // latest all news get api
    app.get("/news", async (req, res) => {
      const news = await newsCollection
        .aggregate([
          {
            $addFields: {
              createdAt: {
                $toDate: "$_id",
              },
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $skip: 1,
          },
          {
            $project: {
              title: 1,
              content: 1,
              imageUrl: 1,
              createdAt: {
                $dateToString: {
                  format: "%Y-%m-%d %H:%M",
                  date: { $toDate: "$_id" },
                },
              },
            },
          },
        ])
        .toArray();
      res.send(news);
    });
    // latest 1 news get api
    app.get("/latestNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $sort: { _id: -1 },
          },
          {
            $limit: 1,
          },
          {
            $addFields: {
              createdAt: {
                $dateToString: {
                  format: "%d-%m-%Y %H:%M",
                  date: { $toDate: "$_id" },
                },
              },
            },
          },
        ])
        .toArray();
      res.send(latestNews);
    });
    // read a singel news
    app.get("/news/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await newsCollection.findOne(query);
      res.send(result);
    });
    // news post api
    app.post("/addNews", async (req, res) => {
      const newsData = req.body;
      const result = await newsCollection.insertOne(newsData);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("listening on port", port);
});
