const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4b5mrxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const spotCollection = client.db("spotStore").collection('tourist');


    app.post("/addtourist", async(req, res)=>{
        console.log(req.body)
        const result=await spotCollection.insertOne(req.body)
        console.log(result)
        res.send(result)
    })
    app.get("/myList/:email",async(req,res) => {
        console.log(req.params.email);
        const result=await spotCollection.find({email:req.params.email}).toArray();
        res.send(result)
    })
    // // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);


app.get('/',(req,res) => {
    res.send('making server is running')
})
app.listen(port, () => {
    console.log(`coffee server is running out ${port}`)
    
})