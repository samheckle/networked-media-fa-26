## Agenda

1. Introduction to Databases
2. Introduction to API

---

## Introduction to Databases

A database, at its most fundamental level, is an external file that stores data for us. Previously, we had an array that stored a post that would get wiped when we restarted the server, but now with a database that won't happen!

With Node.js we can use a variety of database engines such as MySQL, Postgres, MongoDB, and so on. At a very high level, most databases offer the following four types of operations:

- `find`, for looking up data in the database (e.g. for seeing all tweets sent by a user, on their profile page.)
- `insert`, for adding new data to the database (e.g. a Twitter user sending a new tweet)
- `update`, for updating existing data in the database (e.g. a Twitter user editing a tweet they’d already published), and
- `remove`, for deleting existing data from the database (e.g. a Twitter user removing their tweet)

Note: this looks _very similar_ to a structure we have seen before:

| Request  | Database Action | Info                                                   | Example                    |
| -------- | --------------- | ------------------------------------------------------ | -------------------------- |
| `GET`    | `find`          | retrieving information, usually a webpage or file      | visiting a webpage via url |
| `POST`   | `insert`        | sending information, usually via a form                | creating an account        |
| `PUT`    | `update`        | updating information on the server, usually via a form | updating a password        |
| `DELETE` | `remove`        | deleting information on the server, usually via a form | deleting an account        |

For ease-of-use purposes, we will be using a simple database called _nedb._ [nedb](https://www.npmjs.com/package/nedb) is a MongoDB compatible in-memory or on disk datastore that is quick and easy for us to work with without going through a big setup process. However, `nedb` is no longer maintained, so we are using a forked version called [`seald-io/nedb`](https://www.npmjs.com/package/@seald-io/nedb) that continues to be updated with the latest Node and updated dependencies.

In order to use it, we have to install it as we would any normal server side node module:

```
npm install @seald-io/nedb
```

Below is a quick reference to show you how to create a new database, as well as how the four types of operations mentioned above work. See the [**documentation**](https://github.com/seald/nedb?tab=readme-ov-file#documentation) for more.

### Creating a database

The code below imports the `nedb` library into our server-side code, and creates a file on disk which will store our data (the file is called `data.db` in this example. You can use any extension you like, `.db` isn’t mandatory.)

```jsx
// Importing the nedb library, and telling it to create a new datastore for us.
const nedb = require('@seald-io/nedb');
const db = new nedb({ filename: 'data.db', autoload: true });
```

Once you’ve created a database, you are ready to perform operations on it.

### Insert

Since the database operates by accessing the hard drive (and the hard drive is slow compared to the computer’s memory,) all operations are performed asynchronously, and results are delivered to us using a callback. The `insert` operation takes two arguments:

- the data we want inserted into the database
- a callback, which tells us whether the database encountered any errors, and confirms the data that was added.

```jsx
// Importing the nedb library, and telling it to create a new datastore for us.
const nedb = require('@seald-io/nedb');
const db = new nedb({ filename: 'data.db', autoload: true });

// Create a JavaScript Object with data to store
const datatosave = {
	name: 'sam',
	message: 'Hello world',
};

// Insert the data into the database
db.insert(datatosave, (err, newDocs) => {
	console.log('err: ', err);
	console.log('newDocs: ', newDocs);
});
```

If the operation completes successfully, the returned object (`newDocs` in the example above) should be identical to the data we passed for insertion, with one addition: an `_id` field, which the database uniquely assigns to all objects. The `_id` is useful in being able to uniquely identify each element in the database.

### Find

Finding data in a database requires us translating what we’re looking for into a _query_. Different databases use different formats for their queries. In `nedb`, a query is formatted as a regular Javascript object, with a few special fields which take different roles. Think of a query as a _filter_, which tells the database which objects to return. If the filter is empty, the database will return everything. The more specific the filter gets, the fewer elements will be returned.

Below are a few examples of queries.

```jsx
/*
...
Inserting four items into the database
...
*/
db.insert({ planet: 'earth', material: 'solid' } , (err, newDocs) => {});
db.insert({ planet: 'mars', material: 'solid' } , (err, newDocs) => {});
db.insert({ planet: 'venus', material: 'solid' } , (err, newDocs)=>{});
db.insert({ planet: 'jupiter', material: 'gas' } , (err, newDocs) => {});

// .. potentially other code

// Getting **all of the data** currently saved in the DB;
// We do that by passing an empty object as the query.
let query = {}
db.**find**(query, (err, results) => {
	console.log("results: ", results);
	// This will return all objects in the database
});

let marsQuery = { planet: 'mars' }
db.**find**(marsQuery, (err, results) => {
	console.log("results: ", results);
	// This will return one object, the { planet: 'mars', material: 'solid' } one.
})

let solidQuery = { material: 'solid' }
db.**find**(solidQuery, (err, results) => {
	console.log("results: ", results);
	// This will return three objects, ones which have. thesolid material attribute.
})

db.**findOne**(solidQuery, (err, result) => {
	console.log("result: ", result);
	// This will return **one** single object, arbitrary one among the solid material ones.
})
```


## Intro to API

Application Programming Interfaces (API) are ways for us to connect to servers that send data on the web.

We already know now that the internet is made up of clients and servers. Oftentimes we might want to set up a server that just sends information, rather than running an entire front-end.

### Adding a new type of response

We can only use _one_ of these responses at the end of each request handler.

- `response.send()` → send one line of html
- `response.redirect()` → redirect to a different route
- `response.sendFile()` → redirect to a different page
- `response.render()` → render a template

Now we are adding a fifth option:

- `response.json()` → send json data

### Sending Data From Server → Client

In `server.js`, create a new route:

```js
// This is an endpoint we can access to view all messages.
app.get('/api/messages', (request, response) => {
	if (receivedData.length == 0) {
		// If we don't have any data, we send an appropriate message
		response.send('No messages yet...');
	} else {
		// This will send a JSON response, populated with our data array.
		response.json({ messages: receivedData });
	}
});
```

This could be accessed on our client by going to the `/api/messages` route in the URL, but we can also retrieve and use the json data with our client-side javascript.

### Using `fetch()`, `async` and `await`

Something else we will continuously look at are `asynchronous functions`.
[Asynchronous](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing) allows us to simultaneously run different lines of code, as opposed to running them sequentially. This is because making a request to another server will take a little longer than rendering something on our own webpage. But, if we want to modify our own data on our client we need to be able to wait for the request to complete.

- [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) allows us to make a request to a URL with javascript
- [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) goes in the function header to declare a function as `asynchronous`, or enabling multiple actions at once
- [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) tells the asynchronous function to wait for a specific response before continuing

`async`/`await` always work in tandem -- you shouldn't really use one without the other.

In our client javascript (`main.js`):

```js
const getMessages = async () => {
	let response = await fetch('/api/messages');
	let json = await response.json();
};
```

### Sending Data From Client → Server

Right now our JSON response is empty, so we should populate it with front-end javascript. Essentially what we are doing is contructing a request using _just_ javascript. Instead of using a form, we will use this method.

In our client javascript (`main.js`):

```js
const sendMessage = async () => {
	let params = new URLSearchParams({
		clientData: 'some-data',
	});

	let url = '/api/new-message?' + params;

	let response = await fetch(url);
};
```

In `server.js`, create a new route:

```js
app.get('/api/new-message', (request, response) => {
	// the data is coming over the url
	// we access this via the query
	// request.query
	receivedData.push(request.query);
	response.send("data added! <a href='/api/messages/'> see json </a>");
});
```

I typically do not use [status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) in [express](https://expressjs.com/en/5x/api.html#res.status), but APIs are good practice to use them!

### Related Coding Train Videos

- [`fetch()`](https://thecodingtrain.com/tracks/data-and-apis-in-javascript/data/1-client-side/1-fetch)
- [`async`/`await` 1](https://thecodingtrain.com/tracks/topics-in-native-javascript/js/async-await-part-1)
- [`async`/`await` 2](https://thecodingtrain.com/tracks/topics-in-native-javascript/js/async-await-part-2)