
const PouchDB = require('pouchdb');
const db = new PouchDB('items');

// const funcs = require("./funcs");

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const doc = {
    "_id": "sock_puppet_1",
    "name": "sock puppet 1",
    "img": "item-1.jpg",
    "description": "this is one sock puppet",
    "stars": 2,
    "reviewText": "it's pretty good i guess"
};

async function putDoc(doc, res) {
    try {
        res = await db.put(doc);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

// putDoc(doc);





app.get('/api', async (request, response) => {
    // console.log('got a request ' + request);
    const result = await db.allDocs({
        include_docs: true,
        attachments: true
    });
    // console.log(result);
    response.json(result);
});

app.get('/api/:id', async (request, response) => {
    // console.log('got an id request ' + request.params);
    const id = request.params.id;
    // console.log(id);
    const result = await db.get(id);
    // console.log('send back to client: '+result);
    response.json(result);
});


app.post('/insert', async (request, response) => {
    console.log('i got a request');
    console.log(JSON.stringify(request.body));
    const data = request.body;
    try {
        response = await db.put(data);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
    // console.log(database);
    // send data back to the client, for debugging
    // response.json(data);
});

app.post('/update', async (request, response) => {
    console.log('i got a request');
    console.log(JSON.stringify(request.body));
    const data = request.body;
    const doc = await db.get(data._id);
    doc.name = data.name;
    doc.img = data.img;
    doc.description = data.description;
    doc.stars = data.stars;
    doc.reviewText = data.reviewText;
    try {
        response = await db.put(doc);
        // console.log(response);
    } catch (err) {
        console.log(err);
    }
    // console.log(database);
    // send data back to the client, for debugging
    // response.json(data);
});   

app.get('/delete/:id', async (request, response) => {
    // console.log('got an id request ' + request.params);
    try {
    const id = request.params.id;
    // console.log(id);
    const result = await db.get(id);
    response = await db.remove(result);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
    // console.log('send back to client: '+result);
    // response.json(result);
});
