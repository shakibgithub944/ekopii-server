const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express();

app.use(cors())
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ofvswtt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri);
async function run() {

  try {
    const UserCollections = client.db("ekopii-user").collection("users");

    app.get('/', (req, res) => {
      res.send('server is Runninng.....')
    })

    app.get('/user', async (req, res) => {
      const query = {}
      const result = await UserCollections.find(query).toArray();
      res.send(result)
    })

    app.get('/user/:user_type', async (req, res) => {
      const user_type = req.params.user_type
      const query = { user_type: user_type }
      const result = await UserCollections.find(query).toArray();
      res.send(result);
    })

  }
  finally {

  }
}
run().catch(error => console.log(error));


app.listen(port, () => {
  console.log('Server is Runnig on port', port)
})
