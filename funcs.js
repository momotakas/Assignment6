async function getInfo() {
    try {
        const info = await db.info();
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

// getInfo();

const doc = {
    "_id": "badger",
    "name": "Badger",
    "occupation": "big cat",
    "age": 3,
    "hobbies": [
        "biting people",
        "eating",
        "being a good buddy"
    ]
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

async function getDoc(id) {
    try {
        const doc = await db.get(id);
        console.log(doc);
    } catch (err) {
        console.log(err);
    }
};

// getDoc('mittens');

async function getAll() {
    try {
        const result = await db.allDocs({
            include_docs: true,
            attachments: true
        });
        return result;
        for (let k of result.rows) {
        console.log(k.doc);
        }
    } catch (err) {
        console.log(err);
    }
}
// getAll();

async function removeDoc(doc) {
    try {
        let delDoc = await db.get(doc);
        let response = await db.remove(delDoc);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

// removeDoc('mydoc');

async function updateDoc(id, age) {
    try {
        const doc = await db.get(id);
        doc.age = age;
        return await db.put(doc);
        // const response = await db.put({
        //   _id: id,
        //   _rev: doc._rev,
        //   age: age
        // });
        // console.log(response);
      } catch (err) {
        console.log(err);
      }
}

// updateDoc('badger', 3);
module.exports = { updateDoc, getAll, removeDoc, getDoc, getInfo, putDoc };