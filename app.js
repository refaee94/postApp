const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postsRouter=require('./routes/post');
const userRouter=require('./routes/user');

const mongoose = require("mongoose");
const path=require('path');
mongoose.connect('mongodb+srv://memo:123580@cluster0-uqpty.mongodb.net/test?retryWrites=true&w=majority').then(() => {

  console.log('database connected');
}).catch(() => {

  console.log('failed to connect database ');
});
app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));
app.use("/",express.static(path.join(__dirname,"angular")));

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with,Content-Type,Accept,authorizetion');
  res.setHeader('Access-Control-Allow-Methods', 'Get,Post,PUT,DELETE,Options');
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();

});

app.use('/api/posts',postsRouter);
app.use('/api/user',userRouter);
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html"));
});

module.exports = app;
