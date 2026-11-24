const express = require('express');
const multer = require('multer');
const nedb = require('@seald-io/nedb');
const nunjucks = require('nunjucks')
// new! import the cookie-parser library
const cookieParser = require('cookie-parser')

const app = express();
const upload = multer({
	dest: 'public/uploads',
});
const database = new nedb({
	filename: 'database.db',
	autoload: true,
});

nunjucks.configure('views', {
	autoescape: true,
	express: app,
    noCache: true 
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'njk');
// new! adding middleware to parse cookies
// enables us to access the cookie property of a request
// allows to access request.cookies 
app.use(cookieParser())


app.get('/', (req, res)=>{

	// local variable to track number of visits
	let totalVisits = 1

	if(req.cookies.visits){
		let convertToNumber = parseInt(req.cookies.visits)
		totalVisits = convertToNumber + 1
	}
	// create cookie using response parameter
	// sends the cookie back to the client
	// 3 parameters:
	// 1. the name of the cookie, in str format
	// 2. the value of the cookie
	// 3. object of the cookie attributes that are passed into the header
	res.cookie('visits', totalVisits, {expires: new Date( Date.now() + 100 * 365 * 24 * 60 * 60 * 1000 )})
	// send data back to front-end
    res.render('home.njk', {serverData: totalVisits})
})

app.listen(6005, ()=>{
    console.log(`http://localhost:6005`)
})