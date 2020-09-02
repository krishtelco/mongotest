//console.log("May Node be with you");
//https://zellwk.com/blog/crud-express-mongodb/
//https://bezkoder.com/node-express-mongodb-crud-rest-api/
//https://www.digitalocean.com/community/tutorials/react-axios-react
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("listening on 5000");
});
// app.get("/", function (req, res) {
//   res.send("Hello World");
// });
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
//   // Note: __dirname is the current directory you're in. Try logging it and see what you get!
//   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// });
// app.post("/employee", (req, res) => {
//   console.log("Hellooooooooooooooooo!");
//   console.log(req.body);
// });

MongoClient.connect(
  "mongodb+srv://krishtelco1:dummy%23199a@cluster0.xwnjr.mongodb.net/krish?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  },
  (err, client) => {
    // ... do something here
    if (err) return console.error(err);
    console.log("Connected to Database");
    const db = client.db("krish");
    const employeesCollection = db.collection("employee");

    // app.get("/", (req, res) => {
    //   const cursor = db.collection("employee").find();
    //   console.log(cursor);
    //   // ...
    // });

    app.get("/", (req, res) => {
      //res.sendFile(__dirname + "/index.html");
      employeesCollection
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          res.send(results);
        })
        .catch((error) => console.error(error));
      // ...
    });
    app.post("/employeefindone", (req, res) => {
      employeesCollection
        .findOne({ name: req.body.name })

        .then((results) => {
          console.log(results);
          res.send(results);
        })
        .catch((error) => console.error(error));
      // ...
    });
    app.post("/employeeinsert", (req, res) => {
      console.log("insert");
      console.log(req);
      employeesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
    app.post("/employeedelete", (req, res) => {
      employeesCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
    app.post("/employeeupdate", (req, res) => {
      employeesCollection
        .findOneAndUpdate(
          { name: req.body.name },
          {
            $set: {
              name: req.body.name,
              empid: req.body.empid,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
    app.post("/employeefind", (req, res) => {
      employeesCollection
        .findOne({ name: req.body.name })
        .then((result) => {
          console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
  }
);

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://krishtelco1:<password>@cluster0.xwnjr.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
