const serverless = require('serverless-http')
const express = require('express')
const app = express()

const token = process.env.TOKEN

app.get('/webhooks', (req, res) => {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
})
const mongodb = require('mongodb')
const uri = "mongodb+srv://a01635062:Password1234@cluster0.mepmvws.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1 });

app.post('/webhooks', (req, res) => {
  const body = JSON.parse(req.body)
  if (body.field !== 'messages') {
    // not from the messages webhook so dont process
    return res.sendStatus(400)
  }
  const reviews = body.value.messages.map((message) => {
    const reviewInfo = {
      TableName: process.env.REVIEW_TABLE,
      Item: {
        phonenumber: message.from,
        review: message.text.body
      }
    }
    return client.connect().then(client => {
      const collection = client.db("a01635062").collection("responses");
      return collection.insertOne(reviewInfo)
    })
  })
  // return 200 code once all reviews have been written to mongoDB
  return Promise.all(reviews).then((data) => res.sendStatus(200));
})
module.exports.handler = serverless(app);