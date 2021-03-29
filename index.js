const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors')
require ( 'dotenv' ).config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2xoju.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
app.use(bodyParser.json());
app.use(cors);
const port = 5000;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const products = client.db("emaJohnStore").collection("products");
  
  app.post('products', (res,req)=>{
    const product = req.body;
    products.insertOne(product)
    .then(result =>{
      console.log(result);
    })

  })
});


app.get('/', (req, res) => {
  res.send('Hello Ema Watson!')
})

app.listen(port)