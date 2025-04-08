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
            $skip: 6,
          },
          {
            $limit: 6,
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
    // latest bangladesh 1 news get api
    app.get("/latestNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $match: { category: "bangladesh" },
          },
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
    // latest 2 news get api
    app.get("/latest2nd3rdNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $match: { category: "bangladesh" },
          },
          {
            $sort: { _id: -1 },
          },
          {
            $skip: 1,
          },
          {
            $limit: 2,
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
    // Sports //
    // latest Sports 1 news get api
    app.get("/latestSportsNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $match: { category: "sports" },
          },
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
    // latest Sports 2 news get api
    app.get("/latest2nd3rdSportsNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $match: { category: "sports" },
          },
          {
            $sort: { _id: -1 },
          },
          {
            $skip: 1,
          },
          {
            $limit: 3,
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

    // International  //
    // latest International 1 news get api
    app.get("/latestInternationalNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $match: { category: "international" },
          },
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
    // latest Sports 2 news get api
    app.get("/latest2nd3rdInternationalNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $match: { category: "international" },
          },
          {
            $sort: { _id: -1 },
          },
          {
            $skip: 1,
          },
          {
            $limit: 3,
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
    // entertainment  //
    // latest International 1 news get api
    app.get("/latestentertainmentNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $match: { category: "entertainment" },
          },
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
    // latest Sports 2 news get api
    app.get("/latest2nd3rdentertainmentNews", async (req, res) => {
      const latestNews = await newsCollection
        .aggregate([
          {
            $match: { category: "entertainment" },
          },
          {
            $sort: { _id: -1 },
          },
          {
            $skip: 1,
          },
          {
            $limit: 3,
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

    //  all categories news get api
    app.get("/news/:category", async (req, res) => {
      const category = req.params.category;

      const news = await newsCollection
        .aggregate([
          {
            $match: { category: category },
          },
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
          // {
          //   $skip: 3,
          // },
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
    // read a singel news
    app.get("/newsDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await newsCollection.findOne(query);
      res.send(result);
    });

    // when share the content will be show thumbnail and image
    app.get("/share/:id", async (req, res) => {
      const { id } = req.params;
      const news = await newsCollection.findOne({ _id: new ObjectId(id) });

      if (!news) return res.status(404).send("News not found");

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta property="og:title" content="${news.title}" />
          <meta property="og:description" content="${news.content.substring(
            0,
            100
          )}..." />
          <meta property="og:image" content="${news.imageUrl}" />
          <meta property="og:url" content="https://nekrenews/news/${
            news._id
          }" />
          <meta property="og:type" content="article" />
          <title>${news.title}</title>
        </head>
        <body>
          <h1>Redirecting...</h1>
          <script>
            window.location.href = "/news/${news._id}";
          </script>
        </body>
        </html>
      `;

      res.send(html);
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
