// app.set("view engine", "hbs");
//
// app.use("/contact", function(request, response){
//     response.render("contact.hbs");
// });

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const fs = require("fs");


const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = express.json();
const jsonParser2 = bodyParser.json();

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
    })
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
