// app.set("view engine", "hbs");
//
// app.use("/contact", function(request, response){
//     response.render("contact.hbs");
// });

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: false});

const jsonParser = express.json();

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

app.set("view engine", "hbs");

app.use("/contact", function(request, response){
    response.render("contact.hbs", {
        title: "Мои контакты",
        emailsVisible: true,
        emails: ["gavgav@mycorp.com","gavgav@mycorp.com"],
        phone: "+1234567890"
    });
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

// app.use("/register", function(request, response){
//   response.sendFile(__dirname+"/register.html");
// });

app.listen(3000);
