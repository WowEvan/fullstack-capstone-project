const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let url = `${process.env.MONGO_URL}`;
let filename = `${__dirname}/gifts.json`;
const dbName = 'giftdb';
const collectionName = 'gifts';

async function loadData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        let cursor = await collection.find({});
        let documents = await cursor.toArray();

        if(documents.length === 0) {
            console.log("No documents found, inserting data...");
            const insertResult = await collection.insertMany(data);
            console.log('Inserted documents:', insertResult.insertedCount);
        } else {
            console.log("Gifts already exists in DB");
        }
    } catch (err) {
        console.error("Error occurred while processing:", err.message);
    } finally {
        await client.close();
    }
}

const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs;

loadData();
