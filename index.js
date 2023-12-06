const express = require('express')
const app = express()

const port = process.env.PORT||5000
const cors=require("cors")

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello bat!')
})






const { MongoClient, ServerApiVersion } = require('mongodb');
 const uri ="mongodb+srv://bat-inventory:Gq91jiRjhO5AUq6S@cluster0.gfxmdml.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
  
    const batcollection=client.db("Bat-Inventory").collection("Bat")
    // Creating batcollection

    app.get("/getall-bat",async(req, res)=>{
     
     
         const bat=await batcollection.find().toArray();
         console.log(bat)
        //  const result= await batcollection.toArray()
         res.send(bat)
  
     }) 

  //Insert a bat into the collection

    app.post("/upload-bat",async(req,res)=>{

         const data=req.body
         const result=await batcollection.insertOne(data)
         res.send(result)})

//Get all bats from the collection

  



       
        app.patch("/bat/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const updateBatData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    ...updateBatData
                }
            }
            const options = { upsert: true };

            // update now
            const result = await batCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


        // delete a item from db
        app.delete("/deletebat/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result= await batcollection.deleteOne(filter);
            res.send(result);
        })


        // get a single bat data
        app.get("/onebat/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await batCollection.findOne(filter);
            res.send(result)
        })

    
    
    
    
    
    








    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  
