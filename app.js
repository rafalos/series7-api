var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose=require("mongoose"),
    Serie = require("./models/serie"),
    cors = require('cors');

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
      

app.use(bodyParser.urlencoded({ extended: true })),
app.use(bodyParser.json()),
mongoose.connect('mongodb://rafalos:rafalos@ds223268.mlab.com:23268/series7');




////FETCH ALL SERIES/////
router.get("/series", function(req,res,next){
    Serie.find({}, function(err, foundSeries){
        res.jsonp({
            series: foundSeries
        })
    })
})

router.post("/series", function(req, res, next){
    Serie.create(req.body, function(err, createdSerie){
        if(err){
            console.log(err)
        }else {
            console.log(createdSerie)
        }
    })
})

router.get("/series/:id", function(req, res, next){
    Serie.findById(req.params.id, function(err, foundSerie){
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                serie: foundSerie
            })
        }
    })
})


////////////////////




app.use('/api', router);
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
})