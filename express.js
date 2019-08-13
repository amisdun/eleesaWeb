
var express = require("express");
var mongoose = require("mongoose");
const assert = require("assert");
var path = require("path");
var multer = require("multer");
var bodyParser = require("body-parser");
const model = require("./models/model.js");
const urlDB = "mongodb://localhost/coursedb";
const db = mongoose.connect(urlDB);

var app = express();
app.use(express.static('eleesa_web'));
app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,"path to which the file has been saved")
    },
    filename: function(req,res,cb){
        cb(null,"specify the name of the file");
    }
})
var upload = multer({
    storage: storage
})
// app.get("/",function(req,res){
//     res.sendFile(__dirname + "/src/App.vue");
// });

app.get("/findcourse",upload.single("pdfupload"),function(req,res){
    let vals = {
        programVal : res.query.program,
        levelVal : req.query.level,
        semVal : req.query.sem
    }
    res.send(JSON.stringify(vals));
    // res.json(JSON.stringify(vals));
    // console.log(vals);
    // let response = new Array();
    // model.find(vals,function(err,data){
    //     assert.equal(null,err);
    //     if(data.length > 0){
    //         response.push(data);
    //         res.json(response)
    //     }
    //     else if(data.length == 0){
    //         var errMsg = {
    //             message: "No results found for the search"
    //         };
    //         response.push(errMsg);
    //         res.json(response);
    //     }
    // })
})





app.listen(8000,function(err){
    if(err){
        console.log(err)
    }
    console.log("listening to port 8000");
})