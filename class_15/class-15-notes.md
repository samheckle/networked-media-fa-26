## Agenda

1. Housekeeping
2. Review Tutorial

##  Housekeeping

1. [Get your flu shot!!!!!](https://www.nyu.edu/students/wellbeing/clinical-services/medical-services/vaccines/free-flu-shots.html)

## Tutorial: Finishing Templates

1. Displaying user data from server to client
2. Injecting partial template into `.njk`
3. Uploading to Cyberduck
4. Any other Project #3 questions? Add to [this](https://www.tldraw.com/f/F0mDmGN1fHTHLgSHhmAoM?d=v0.0.1440.802.gCBKJse6f88X3fhRFeZ2F)
5. Adding file upload for images inside of form.

### Displaying user data

Our data will be stored in a global array on our server.

```js
// server.js
let allData = []
```

The way we add to this array is via a form in our html. This form has 2 important attributes:
- `method`: the HTTP method we send to the server. This determines that we handle the request with `app.post`
- `action`: the route we add as our first parameter in our request

```html
<!-- views/form.njk -->
<form method="POST" action="/send-message">
    <input type="text" name="user" />
    <input type="text" name="message" />
</form>
```

For every form, we need to have the associated server request handler. Because of our method, we use `app.post`, and because of the action we are receiving data on the `/send-message' route.

```js
// server.js
app.post('/send-message', (request, response)=>{
    // Once we receive the request, we need to do 2 things:
    // 1. save the data to our global server variable
    // 2. redirect to a different page that displays the data

    allData.push(request.body)
    response.redirect('/view-all')
})
```

Now we don't have a `/view-all` handler, so we also need to add a handler for it and the file that should be rendered.

`response.render` takes an optional second parameter that passes in an object. Each property of the object will be an accessible variable we can access on the client-side. 

```js
// server.js
app.get('/view-all', (request, response)=>{
    // the property that will be accessible in the njk file is messageFromArray
    // it will have all of the data from the allData global array on the server
    // we have to do this because the render function takes in objects only so we have to follow object syntax
    response.render('view-all.njk', {messagesFromArray: allData})
})
```

```html
{# views/view-all.njk #}

{# this is nunjucks syntax for a loop #}
{# in javascript, this is like a for..of loop #}
{% for singleMessage in messagesFromArray %}

    {# messagesArrayFromServer *is* the allData array, which is an array of objects #}
    {# each object is structured like {user: something, message: something} #}
    {# user and message are defined via the name attributes on the inputs in the form #}
    {# singleMessage is a temporary variable that is the same structure of an individual obj #}
    <p>
        <span>user: </span>
        <span>{{ singleMessage.user }}</span>
    </p>
    <p>
        <span>message: </span>
        <span>{{ singleMessage.message }}</span>
    </p>
{% endfor %}
```

### Injecting partial template into `.njk`

Partials are useful to allow for reusability for different parts of the code. We can think of them like functions for HTML. 

With a partial file, we can make something that is like a nav bar and inject the Nunjucks partial syntax so we don't have to rewrite each nav bar individually. 

```njk
{% include "name-of-my-file.njk" %}
```

This adds modularity into our HTML files! Think about best ways to incorporate reusuability. 

### Making your website live

There is a [video tutorial](https://youtu.be/XXaF1O7aFDU) of this written explanation as well. 

We did this a long time ago when setting up our `webserver/` folder. But, we will do it again now. 

For Project 3, you will need to upload everything to your `project3/` folder in Cyberduck. Along with this, we need to run our Node scripts. 

1. Open your project in your file explorer.
2. Open up Cyberduck.
3. *In* the folder of your project on your computer, select:
    - `public/`
    - `views/`
    - `package.json`
    - `server.js`
4. Drag these files into the `project3/` folder in Cyberduck.
5. Now the files are uploaded, but we still need to start the server.
6. Get your DigitalOcean IP address. 
7. Open Terminal and log in to your server
    - `ssh root@your-ip-address`
8. Enter your password for the server. This is the password we set when you created the server (not the account!).
    - Remember it **does not show key presses, so you won't be able to see any feedback while typing**
9. After logging in, it should say `root@sam-networked-media:~# ` or something similar. *If it does not say `root` you are not in the correct location* 
10. In Terminal, navigate to your project3 folder
    - `cd project3/`
11. Test that your server is working
    - `node server.js`
    - If you have an error, likely you need to run `npm install`. After running, test the server is working again.
12. Verify that the website is live `http://your-ip-address:8080`
13. Close the test server with CTRL+C
14. Once you have checked everything, now you need to get the server to run permanently. 
    - `pm2 start server.js --name project3`

### Adding file upload for images inside of form

1. In your folder, install another package: `npm install multer`

2. Look at [`form.njk`](./uploading_images_demo/views/form.njk)

    - We need to add an input that has a type of `file`. The name attribute will set how we reference the image file in our `server.js`

3. Look at the [`server.js`](./uploading_images_demo/server.js)

    - Read through the comments to set up the server file correctly
    - We need to make sure we have multer installed (in Step 1) and import the library.
    - Then modify `app.post('/send-message')`

4. Next, look at the [`view-all.njk`](./uploading_images_demo/views/view-all.njk)

    - All we need to add is the property that stores the image file. 
