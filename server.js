const express=require('express');
const bodyParser=require("body-parser");
const path=require("path");
const http=require("http");

//import user files
const CONFIG=require("./configs.js");

//initialize server
const app=express();
const Server=http.Server(app);

//middlewares

//Serve Static Files
app.use(express.static(__dirname+ "/public_html/"));

//user data
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

//set view engine
app.set("view engine","ejs");

//routes
app.use("/customerDecided",require("./routes/CustomerDecided"));
app.use("/adminDecided",require("./routes/AdminDecided"));

app.get('/',(req,res)=>{
    res.render("index");
});

app.listen(CONFIG.SERVER.PORT,function () {
    console.log(`Server started at: http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT} `);
});

