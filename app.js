// Requiring dependencies
var faker   = require("faker"),
    mysql   = require("mysql"),
    bodyParser = require("body-parser"),
    express = require("express"),
    app     = express();

app.set("view engine", "ejs");    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// Connecting to db
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'vladonof',
   database : 'join_us'
});
    
// index route
app.get("/", function(req, res){
  var q = 'SELECT COUNT(*) AS count FROM users';
  connection.query(q, function(err, results){
    if(err) throw err;
    var count = results[0].count;
    res.render("index", {count: count});
  });
});

// post route
app.post("/register", function(req, res){
  var q = {email: req.body.email};
  connection.query('INSERT INTO users SET ?', q, function(err, results){
    if(err) throw err;
    res.redirect("/");
  });
  console.log(q);
});


app.get("/joke", function(req, res){
    var joke = "What do you call a dog that does magic tricks? A labracadabrador";
    res.send(joke); 
});




app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The Server Has Started....");
});