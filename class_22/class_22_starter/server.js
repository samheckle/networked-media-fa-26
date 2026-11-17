// Q: how do we know this is a node project?
// A: 

// Q: how do we run this project?
// A: 

// Q: Try running the project. What command do you need to run to get it to work and why do you need to run that command?
// A: 

// 1. import libraries
const express = require('express');
const multer = require('multer');
const nedb = require('@seald-io/nedb');
const nunjucks = require('nunjucks')

// Q: what do these variables do? write the answer above each declaration.
// A: 
const app = express();
// A: 
const upload = multer({
	dest: 'public/uploads',
});
// A: 
const database = new nedb({
	filename: 'database.db',
	autoload: true,
});

// Q: what do each of these items set up? write above each item configuration.
// A: 
nunjucks.configure('views', {
	autoescape: true,
	express: app,
    noCache: true // NEW! we don't have to restart the server for .njk updates :)
});
// A: 
app.use(express.static('public'));
// A: 
app.use(express.urlencoded({ extended: true })); 
// A: 
app.set('view engine', 'njk');

// Q: what route do we use to go to the home page? how do we access it in the browser?
// A: 
app.get('/', (req, res)=>{
    res.render('home.njk')
})

app.listen(6005, ()=>{
    console.log(`http://localhost:6005`)
})