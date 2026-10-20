## Agenda

1. Housekeeping
2. Reading Discussion #5
3. Tutorial: Introduction to Templates
## Housekeeping

1. Attendance
2. Project #3 due 10/27

## Reading Discussion #5
## Introduction to Templates

Last week, we talked about the 4 different ways to respond to a client request:

- `response.send()` → send one line of html
- `response.redirect()` → redirect to a different route
- `response.sendFile()` → redirect to a different page
- `response.json()` → send JSON data

At the end of the day, this means we still need to write HTML and may need to copy data (such as stylesheets or nav bars).

Fortunately, templating systems provide a solution to this problem: they extend the HTML syntax with a few other custom tags & keywords (each templating system has its own flavor) which allow us to easily inject data stored on the server into an HTML file.

Let’s look at a generic example. If I was to build my own templating system, I could choose to use the `[` and `]` characters as a signifier for data that needs to be introduced by the server into the HTML file.

```html
<html>
  <head> </head>
  <body>
    <h1> This is a fictional template </h1>

    <h2> With a dynamic variable that has the value: **[myVariable]** </h2>
  </body>
</html>
```

and our server logic might follow something like this pseudo-code

```js
app.get('/page', function(request, response) {
	0. Have some data you want to populate the page with
	(e.g. var myVariable = "Test")
	1. Read the `page.html` file (the one from above)
	2. Look for any instances of **[myVariable]** in the file contents
	3. Replace them with the value of **myVariable**, which in our case is "Test"
	4. use response.send() to send a real HTML file to the browser.
})
```

After all this processing, the server would send back an actual HTML file, which replaces `[myVariable]` with the word `Test`.

```html
<html>
  <head> </head>
  <body>
    <h1> This is a fictional template </h1>
    <h2> With a dynamic variable that has the value: Test </h2>
  </body>
</html>
```

The key takeaway from this example is the fact that the web browser has no awareness of our templating syntax, so the server does all the work in converting a template into a working HTML file, with all the data correctly populated.

### Enter Nunjucks

Fortunately for us, there are a [plethora templating systems](https://github.com/expressjs/express/wiki?_ga=1.148202167.14603651.1486561881#template-engines), so we don’t have to build our own. Many of them are cross-platform (`moustache`) and/or inspired by other platforms (`jade` ). These unfortunately are either complex to setup or require that you learn another language for authoring HTML.

Enter [Nunjucks](https://mozilla.github.io/nunjucks/)

Let's start a new project and look at how we can start incorporating Nunjucks.

1. In your class-demos folder, create `class-14-demo`
2. Open this folder in VS Code
3. Initialize the project as a node project
4. `npm install express nunjucks`

Now we create and modify our `server.js` file:

```js
const express = require("express");
/************
 * import our templating library
 ************/
const nunjucks = require("nunjucks");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/************
 * add our nunjucks settings under our middleware
 * this links our express application to the templating tool
 ************/
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");
```

What Nunjucks looks for is a folder called `views/` that will store all our layout data. Just like our `public/` folder, we need to create it. It doesn't matter what these folders are named, as long as they are consistent between the code and the folder in your structure. F

```
networked-media/
├── class-demos/
│   ├── class-14-demo/
│   │   ├── server.js
│   │   ├── public/
│   │   ├── views/
```

The difference between `public/` and `views/` is that `public/` will now hold _only_ our assets, css, and front-end javascript. We are no longer going to be writing basic `.html` files, but instead creating _templates_.

Inside `views/`, let's create our first template called `baseLayout.njk`:

```njk
<html>
    <head>
    </head>
    <body>
        <h1> my first template </h1>
        {{ serverData }}
    </body>
</html>
```

This is super similar to regular html, but with the `{{ }}` syntax. These are variables that are populated via our server. So let's send the data from the server with a GET request. Instead of using our previous methods (`send()`, `sendFile()`, `redirect()`, or `json()`), we now use `response.render()`

What `response.render()` does is it uses our `view engine` to render it into HTML. It takes in 2 parameters:

`response.render('name-of-template-file.njk', {})`

The second parameter is an object, to which we set the value of the variables that are displayed on the client-side. So if we wanted to populate `serverData`

```js
app.get("/template-test", (request, response) => {
  response.render("baseLayout.njk", {
    serverData: "i sent this from my server!",
  });
});
```

| Feature           | Nunjucks Syntax              |
| ----------------- | ---------------------------- |
| Output (Escaped)  | `{{ user.name }}`            |
| Output (Raw HTML) | `{{ user.bio \| safe }}`     |
| If-Statement      | `{% if user %}`              |
| End If-Statement  | `{% else %} ... {% endif %}` |
| For Loop          | `{% for item in items %}`    |
| End Loop          | `{% endfor %}`               |
| Include           | `{% include "header.njk" %}` |
| Comments          | `{# comment #}`              |