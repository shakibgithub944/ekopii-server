const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    app.get('/user/:userType', async (req, res) => {
      const user_type = req.params.userType
      const query = { userType: user_type }
      const result = await UserCollections.find(query).toArray();
      res.send(result);
    })

    app.post('/addUser', async (req, res) => {
      const user = req.body;
      const result = await UserCollections.insertOne(user);
      res.send(result);
    })

    app.get('/singleUser/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await UserCollections.findOne(query);
      res.send(result)
    })

    app.put('/updatedUser/:id', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const firstName = user.firstName
      const lastName = user.lastName
      const division = user.division
      const district = user.district

      const query = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updatedDoc = {
        $set: {
          firstName,
          lastName,
          division,
          district
        }
      }
      const result = await UserCollections.updateOne(query, updatedDoc, options);
      res.send(result)
    })


  }
  finally {

  }
}
run().catch(error => console.log(error));


app.listen(port, () => {
  console.log('Server is Runnig on port', port)
})
