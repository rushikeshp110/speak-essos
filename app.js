const express = require ("express");
const bodyParser = require ("body-parser");
const request = require('request');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine" , "ejs");
app.use( express.static( "public" ) );


app.get("/",function(req,res){
  res.render("index");
})

app.post("/",function(req,res){
  var nama = req.body.d;
  console.log(nama);

    request("https://api.funtranslations.com/translate/dothraki.json?text="+nama, { json: true }, (err, response, body) => {
       if (err) { return console.log(err);
console.log(body.error.code);
console.log(body.error.message);
       }


  if(body.response === "error"){
    console.log(body.error);
  }

if(body.success.total == 1){
    if (err) { return console.log(err)}
      else{
        var text = body.contents.translated;
        res.render("translation",{text: text, nama:nama})
console.log(body.contents.translated);
      }

  }

});
})


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});

// font-family: 'Berkshire Swash', cursive;
// font-family: 'Nanum Myeongjo', serif;
