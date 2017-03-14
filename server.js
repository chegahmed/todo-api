/**
 * Created by ahmed on 13/03/2017.
 */

var express =require('express');
var app =express();
var PORT =process.env.PORT || 3000;
//var middleware =require('./middleware');

app.get('/',function (req,res) {
    res.send('Todo API Root!');
})


app.listen(PORT,function () {
    console.log('Express listening on port '+PORT +' !');
});


/*

 //app.use(middleware.requireAuthentication);
 app.use(middleware.logger);

 app.get('/about',middleware.requireAuthentication,function (req,res) {
 res.send('About As!');
 });

 app.use(express.static(__dirname+'/public'));
 //console.log(__dirname)
 */


















