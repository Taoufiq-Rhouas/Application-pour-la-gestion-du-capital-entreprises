const path = require('path');
const express = require("express");
const hbs = require('hbs');
const app = express();
// const partialsPath = path.join(__dirname, './partials');
var bodyParser = require('body-parser'),
path_jsonfile = 'data/Employer.json',
LoadData = require('./Modale/Readandwrite');
var data2 = LoadData.LoadJson(path_jsonfile);
urlencodedParser = bodyParser.urlencoded({ extended: false });
// *Define paths for express config
const viewPath = path.join(__dirname, './views');
// *setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
// registerPartials take the path to the direcotory where my partials leaves
app.use("/public/css/tableau.css",express.static("./public/css/tableau.css"));
// Lancement des pages
app.get("/table.hbs", (req, res) =>{
  res.render('table',{data2});
});
// Port
var port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));
/*server local*/
//button recherche
app.post("/table.hbs",urlencodedParser,function(req,res){  
    var Question = LoadData.LoadJson(path_jsonfile);
    var data2 = [{Matricule:null,nom:null,Prenom:null,salaire:null,Age:null,departement:null}];
   
    for(var i = 0;i<Question.length;i++){
      if(req.body.valeur == Question[i].nom){
    data2[0] = Question[i];
  
    }
    }
    console.log(data2);
    res.render('table.hbs',{data2});
    });



