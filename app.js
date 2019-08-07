var express = require("express");
var app = express();
var port = 3000;
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var nameSchema = new mongoose.Schema({
  user_name: String,
  user_height: String,
  user_age: String,
  user_email: String,
  user_message: String
});
var User = mongoose.model("User", nameSchema);
var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;

var url = "mongodb+srv://<username>:<password>@cluster0-g1zqc.mongodb.net/test?retryWrites=true&w=majority"

var uRl = process.env.MONGOLAB_URI ||"mongodb://localhost/node-demo";

console.log(url);
mongoose.connect(url, {

useNewUrlParser: true
}).then(()=>{
  console.log("connected to db");
})
.catch((err)=>{
  console.log("error:",err);
});


app.post("/submitted",function(req,res){
res.render("submitted.ejs");
var myData = new User(req.body);
myData.save(function(err){
  if(err){ 
    console.log("Error:", err);
  }else{
    console.log("success");
  }
});
});


app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
