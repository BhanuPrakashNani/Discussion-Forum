var express = require('express')
var mongojs = require('mongojs')
var db = mongojs('mongodb://bhanuprakashnani:rajeswari12345@cluster0-shard-00-00-eivd1.mongodb.net:27017/project1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', ['codinza'])

var app = express()
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/dash', function(req, res){

})

app.get('/profile', function(req, res){

})

app.get('/signupsubmit', function (req, res) {
    var da = {
        Name: req.query.na,
        Email: req.query.em,
        Phone: req.query.ph,
        Password: req.query.ps

    }

    db.codinza.find({Email: req.query.em}, function (err, data) {
        if (err) {
            res.send("something went wrong")
        } else {
            if (data.length > 0) {
                res.send("Email id is exist")
            }
            else {
                db.codinza.insert(da, function (err, data) {
                    if (err) {
                        res.send("something went wrong")
                        console.log(err)
                    } else {
                        res.sendFile(__dirname + '/public/login.html')
                    }
                })
            }
        }
    })
})

app.get('/loginsubmit', function (req, res) {
    var da = {
        Email: req.query.em2,
        Password: req.query.ps2
    }

    db.codinza.find(da, function(err, data){
        if(err)
        {
            res.send("something went wrong")
        }

        else
        {
            if(data.length>0)
            {
                console.log(data)
                //res.render('bhanu')

                db.codinza.find({}, function(err, dat){
                    if(err){
                        res.send("something went wrong")
                    }
                    else{
                        console.log(dat)
                        res.render('bhanu', {res:data, use:dat})
                    }
                })
            }

            else{
                res.send("username and password is wrong")
            }
        }
    })
})
    // db.codinza.insert(da, function (err, data) {
    //     if(err){
    //         console.log(err)
    //     }
    //
    //     else{
    //         res.sendFile(__dirname + '/public/login.html')
    //     }
    // })


app.get('/profile/:username', function (req, res) {
    db.codinza.find({Email:req.params.username}, function (err, data) {
        if(err)
        {
            res.send("something went wrong")
        }

        else{
            res.render('bhanu', {use:data})
        }
    })
})

app.listen(4000, function(){
    console.log("Server is running");
})
