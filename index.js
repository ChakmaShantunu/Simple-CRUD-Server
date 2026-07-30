const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.babyuwc.mongodb.net/?appName=Cluster0`;

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // database and collection setup
        const database = client.db('usersdb');
        const usersCollection = database.collection("users");

        const database2 = client.db('productdb');
        const productsCollection = database2.collection("products");

        const database3 = client.db('categorydb');
        const categoriesCollection = database3.collection("categories");

        app.get("/users", async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/products", async (req, res) => {
            const cursor = productsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/categories", async (req, res) => {
            const cursor = categoriesCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // find user
        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

        // find product
        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productsCollection.findOne(query);
            res.send(result)
        });


        // Define the POST route to receive and save a new user
        app.post("/users", async (req, res) => {
            console.log('data in the server', req.body);

            // Store the incoming user object from the request body
            const user = req.body;

            // Insert the single user document into the 'users' collection
            const result = await usersCollection.insertOne(user);

            // Send the result back to the client
            res.send(result);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        });

        // add product
        app.post("/products", async (req, res) => {
            console.log('data in the server', req.body);

            const product = req.body;
            const result = await productsCollection.insertOne(product);

            res.send(result);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        });

        // add category
        app.post("/categories", async (req, res) => {
            console.log('data in the server', req.body);

            const category = req.body;
            const result = await categoriesCollection.insertOne(category);
            res.send(result);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        });

        // update user info
        app.put("/users/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const user = req.body;
            const updatedDoc = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }

            const options = { upsert: true };

            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

            console.log(user);
        });

        // update product info
        app.put("/products/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const product = req.body;

            const updatedDoc = {
                $set: {
                    name: product.name,
                    price: product.price
                }
            };

            const options = { upsert: true };
            const result = await productsCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

            console.log(product);
        });

        // delete user
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            res.send(result);
            console.log('to be deleted', id);
        });

        // delete product
        app.delete("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        });

        // delete Category
        app.delete("/categories/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await categoriesCollection.deleteOne(query);
            res.send(result);
        });



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello boss! Welcome the the simple-crud-server");
});

app.listen(port, () => {
    console.log(`Simple crud server is running on port ${port}`);
});

