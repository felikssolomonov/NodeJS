//
// const express = require("express");
// var app = express();
//
// app.get("/", function (request, response){
//
//     response.send("Hello Test");
// });
//
// app.get("/error", function (request, response){
//
//     response.status(404).send("NotFound");
// });
//
// app.get("/user", function (request, response){
//
//     response.send({name:"Tom", age: 22});
// });
//
// app.listen(3000);
//
// console.log("007");
//
// module.exports.app = app;
////////////////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
// const MongoClient = require("mongodb").MongoClient;
// const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

// const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

// let dbClient;

const userScheme = new Schema({name: String, age: Number}, {versionKey: false});
const User = mongoose.model("User", userScheme);

app.use(express.static(__dirname + "/public"));

// mongoClient.connect(function(err, client){
//     if(err) return console.log(err);
//     dbClient = client;
//     app.locals.collection = client.db("usersdb").collection("users");
//     app.listen(3000, function(){
//         console.log("Сервер ожидает подключения...");
//     });
// });

mongoose.connect("mongodb://localhost:27017/usersdb", {useNewUrlParser: true}, function(err){
      if(err) return console.log(err);
      app.listen(3000, function(){
          console.log("Сервер ожидает подключения...");
      });
});

app.get("/api/users", function(req, res){
    // const collection = req.app.locals.collection;
    // collection.find({}).toArray(function(err, users){
    //
    //     if(err) return console.log(err);
    //     res.send(users)
    // });
    User.find({}, function(err, users){
      if(err) return console.log(err);
      res.send(users);
    });
});
app.get("/api/users/:id", function(req, res){
    // const id = new objectId(req.params.id);
    // const collection = req.app.locals.collection;
    // collection.findOne({_id: id}, function(err, user){
    //     if(err) return console.log(err);
    //     res.send(user);
    // });
    const id = req.params.id;
    User.findOne({_id:id}, function(err, user){
      if(err) return console.log(err);
      res.send(user);
    });
});

app.post("/api/users", jsonParser, function (req, res) {
    // if(!req.body) return res.sendStatus(400);
    // const userName = req.body.name;
    // const userAge = req.body.age;
    // const user = {name: userName, age: userAge};
    // const collection = req.app.locals.collection;
    // collection.insertOne(user, function(err, result){
    //
    //     if(err) return console.log(err);
    //     res.send(user);
    // });
    if(!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userAge = req.body.age;
    const user = new User({name: userName, age: userAge});
    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});

app.delete("/api/users/:id", function(req, res){
    // const id = new objectId(req.params.id);
    // const collection = req.app.locals.collection;
    // collection.findOneAndDelete({_id: id}, function(err, result){
    //     if(err) return console.log(err);
    //     let user = result.value;
    //     res.send(user);
    // });
    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){
        if(err) return console.log(err);
        res.send(user);
    });
});

app.put("/api/users", jsonParser, function(req, res){
    // if(!req.body) return res.sendStatus(400);
    // const id = new objectId(req.body.id);
    // const userName = req.body.name;
    // const userAge = req.body.age;
    // const collection = req.app.locals.collection;
    // collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
    //      {returnOriginal: false },function(err, result){
    //
    //     if(err) return console.log(err);
    //     const user = result.value;
    //     res.send(user);
    // });
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const newUser = {age: userAge, name: userName};
    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err);
        res.send(user);
    });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    console.log("Жаль, что вы так рано уходите...");
    dbClient.close();
    process.exit();
});
////////////////////////////////////////////////////////////////////////////////
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// установка схемы
// const userScheme = new Schema({
//   name: {
//     type: String,
//     required: true,
//     minLength: 3,
//     maxLength: 20
//   },
//   age: Number
// });

// подключение
// mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });
//
// const User = mongoose.model("User", userScheme);
// const user = new User({
//   name: "Bill",
//   age: 41
// });
// User.create({name: "Tom", age: 34}, function(err, doc){
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log("Сохранен объект", doc);
// });

// User.find({}, function(err, doc){
//   console.log("find {}");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });
//
// User.find({name: "Tom"}, function(err, doc){
//   console.log("find Tom");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });
//
// User.findOne({name: "Tom"}, function(err, doc){
//   console.log("findOne Tom");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });
//
// const id = "5c8b778f28ccfb0f5422b15e";
// User.findById(id, function(err, doc){
//   console.log("find by ID");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });
//
// User.remove({age: 444}, function(err, doc){
//   console.log("remove all by criterian");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });
//
// User.findOneAndDelete({age: 444}, function(err, doc){
//   console.log("remove one by criterian");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });

// User.findByIdAndDelete(id, function(err, doc){
//   console.log("remove by id");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });

// User.updateOne({name: "Tom"}, {name: "Tommas"}, function(err, doc){
//   console.log("update one");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });
//
// User.updateMany({name: "Tom"}, {name: "Tommas"}, function(err, doc){
//   console.log("update one");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });
//
// User.findByIdAndUpdate(id, {age: 77}, {new: true}, function(err, doc){
//   console.log("update one");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });
//
// User.findOneAndUpdate({age: 34}, {age: 77}, {new: true}, function(err, doc){
//   console.log("update one");
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log(doc);
// });

// user.save(function(err){
//   mongoose.disconnect();
//   if(err) {
//     return console.log(err);
//   }
//   console.log("Сохранен объект", user);
// });
