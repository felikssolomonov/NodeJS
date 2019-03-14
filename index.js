// app.set("view engine", "hbs");
//
// app.use("/contact", function(request, response){
//     response.render("contact.hbs");
// });


////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;


const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = express.json();
const jsonParser2 = bodyParser.json();
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

let users = [{name: "Vasya", age: 48}, {name: "Alex", age: 18}, {name: "John", age: 37}];

mongoClient.connect(function(err, client){
  const db = client.db("userdb");
  const collection = db.collection("users");
  let user = {name: "Daniel", age: 28};
  // collection.insertOne(user, function(err, result){
  //   console.log("insert one:");
  //   if(err){
  //     return console.log(err);
  //   }
  //   console.log(result.ops);
  //   client.close();
  // });
  // collection.insertMany(users, function(err, result){
  //   console.log("insert many:");
  //   console.log(result);
  //   client.close();
  // });
  if(err){
    return console.log(err);
  }
  // collection.find().toArray(function(err, result){
  //   console.log(result);
  //   client.close();
  // });
  // collection.findOneAndUpdate(
  //   {name: "Mister John"},
  //   {$set: {age: 68}},
  //   {//если хотим на него нового взглянуть, если на старого то это вообще убрать
  //     returnOriginal: false
  //   },
  //   function(err, result){
  //     console.log(result);
  //     client.close();
  //   }
  // );
  // collection.updateMany(
  //   {name: "Vasya"},
  //   {$set: {age: 111}},
  //   function(err, result){
  //     console.log(result);
  //     client.close();
  //   }
  // );
  // collection.updateOne(
  //   {name: "Vasya"},
  //   {$set: {name: "Vasily Ivanovich"}},
  //   function(err, result){
  //     console.log(result);
  //     client.close();
  //   }
  // );
  // collection.find({age: 28}).toArray(function(err, result){
  //   console.log(result);
  //   client.close();
  // });
  // db.collection("users").findOne(function(err, result){
  //   console.log(result);
  //   client.close();
  // });
  // db.collection("users").findOne({name: "Vasya"},function(err, result){
  //   console.log(result);
  //   client.close();
  // });
  // db.collection("users").deleteMany({name: "Vasya"},function(err, result){
  //   console.log(result);
  //   client.close();
  // });
  // db.collection("users").deleteOne({name: "Alex"},function(err, result){
  //   console.log(result);
  //   client.close();
  // });
  // db.collection("users").findOneAndDelete({name: "Alex"},function(err, result){
  //   console.log(result);
  //   client.close();
  // });
  // db.collection("users").drop(function(err, result){
  //   console.log(result);
  //   client.close();
  // });
  collection.find().toArray(function(err, result){
    console.log(result);
    client.close();
  });
});

app.get("/register", urlencodedParser, function(request, response){
  response.sendFile(__dirname+"/register.html");
});

app.get("/register/:name.:age", function (request, response) {
  response.send("name: " + request.params["name"] + "<br>age: " + request.params["age"]);
});

app.post("/user", jsonParser, function(request, response){
  if(!request.body) {
    return response.sendStatus(400);
  }
  console.log(request.body);
  response.json(request.body.userName + " " + request.body.userAge);
});

app.post("/register", urlencodedParser, function(request, response){
  if(!request.body) {
    return response.sendStatus(400);
  }
  console.log(request.body);
  console.log(request.body.userName);
  response.send("userName = "+request.body.userName
    +"<br>userAge = "+request.body.userAge);
});

function getTime(){
    var myDate = new Date();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return "Текущее время: " + hour + ":" + minute + ":" + second;
}

function getArr(array){

    var result="";
    for(var i=0; i<array.length; i++){
        result +="<li>" + array[i] + "</li>";
    }
    return new hbs.SafeString("<ul>" + result + "</ul>");
}

app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs",
        helpers: {
            time: getTime(),
            fruits: getArr(["apple", "lemon", "banana", "grape"]),
            emails: getArr(["gavgav@mycorp.com","gavgav@mycorp.com"]),
        }
    }
));

app.set("view engine", "hbs");


hbs.registerPartials(__dirname + "/views/partials");

app.use("/contact", function(request, response){
    response.render("contact", {
      title: "Мои контакты",
      emailsVisible: true,
      phone: "+1234567890",
    });
});

app.use("/", function(request, response){
    response.render("home.hbs");
});

const productRouter = express.Router();

productRouter.use("/create",function (request, response) {
  response.send("Добавление товара");
});

productRouter.use("/:id",function (request, response) {
  response.send("Товар "+request.params.id);
});

productRouter.use("/",function (request, response) {
  response.send("Список товаров");
});

app.use("/products", productRouter);

app.use("/", function (request, response) {
  response.send("Главная страница");
});

app.use("/about", function (request, response) {
  response.send("О сайте");
});

app.use("/register", function(request, response){
  response.sendFile(__dirname+"/register.html");
});

app.listen(3000);

module.exports.app = app;
