var express=require('express')
var app=express()

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())

var backend=require("./backend")
app.use('/',backend)


var server=app.listen(3001,function(){
    console.log("Server started at port no %s",server.address().port)
})
