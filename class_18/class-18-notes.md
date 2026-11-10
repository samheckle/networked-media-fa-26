## Agenda

1. Reading Discussion #6
2. Lecture: Mastodon
3. Tutorial: Mastodon

---

## Mastodon

<img src="https://github.com/samheckle/networked-media-sp-26/blob/main/images/cdd.png" style="width:400px">

<img src="https://github.com/samheckle/networked-media-sp-26/raw/main/images/cdd-overlay.png" style="width:400px">

### What is decentralized?

A server with multiple instances using the same data.

### What is federation?

Ways that different servers can communicate with the same data.

Think about email: you can use @gmail, @nyu, @yahoo, @proton and they are all able to communicate due to federation.

Another example is Discord: you have 1 discord account but you can join a bunch of different discord servers. 

[ActivityPub](https://activitypub.rocks/) is a specific decentralized networking protocol that allows for federation to happen.

<img src="https://web.archive.org/web/20261010233229if_/https://activitypub.rocks/static/images/ActivityPub-tutorial-image.png" style="width:400px">

### What is Mastodon?

A social media site that leverages ActivityPub to connect each server to one another. Similar to Discord, you have one account that can view multiple servers, but your feed is stored on one server. 

We have our own server! https://networked-media.itp.io/about

## Using *a* Mastodon API

So far, we have only been using APIs with our *own* server. But we can leverage APIs to do things on other servers too! If we are accessing *other* servers, **we don't need to run our own server.js**

After opening our class17 folder in VSCode, we will open our terminal to install our libraries. 

The two libraries we are using today are 

* [dotenv](https://www.npmjs.com/package/dotenv)
* [masto.js](https://github.com/neet/masto.js/)

```sh
npm init -y
npm install masto dotenv
```

We need to only create 2 files today:

* `.env` - this allows us to access and store any variables that we don't want to make public, like our passwords for our bots
* `bot.js` - this will run our bot script

In `.env` we need to connect our bot account to our mastodon account. We need to populate a token variable:

```
TOKEN=
```

The value from this variable comes from Mastodon. So open your Mastodon account → Preferences → Development → New Application

1. Name the application whatever you want 
2. Under "Scopes" find and check the `read` and `write` boxes, highlighted in red text. 
3. Press submit. 
4. Click on your application name and copy `Your access token`. *This is a password and you do not want to expose this publically to the web*.

We will populate the token variable in our `.env` file with this. 

```
TOKEN=abcdefghijklmnopqrstuvwxyz
```

After that, we can start working on our `bot.js` by importing our libraries.

```js
require('dotenv').config();
const m = require('masto');
```

Using the masto library requires us to set up a `RestAPIClient` which will handle constructing our requests for us. 

```js
const masto = m.createRestAPIClient({
	url: 'https://networked-media.itp.io/',
	accessToken: process.env.TOKEN,
});
```

Then, we can write a function that allows us to leverage the API to write a text status for us.

```js
async function makeStatus(text) {
	const status = await masto.v1.statuses.create({
		status: text,
		visibility: 'private',
	});
}
```

Lastly, we can set up an interval to use this function:

```js
setInterval(() => {
	let emoji = ['😭', '🤩', '💖'];

	let rand = Math.floor(Math.random() * emoji.length);

	let post = emoji[rand];

	makeStatus(post);
}, 5000);
```

We can run our bot from our terminal using 

```js
node bot.js
```

## Uploading to Droplet

In order to get these packages running on our droplet, we need to upload the files to our project 4 folder in Cyberduck.

1. Open your project in your file explorer. 
    - You may need to unhide files to view your `.env` file.
    - Mac: ⌘ + Shift + `.`
    - PC: View → Show → Check Hidden items
2. Open up Cyberduck.
3. *In* the folder of your project on your computer, select:
    - `package.json`
    - `bot.js`
    - `.env`
4. Drag these files into the `project4/` folder in Cyberduck.
5. Now the files are uploaded, but we still need to start the server.
6. Get your DigitalOcean IP address. 
7. Open Terminal and log in to your server
    - `ssh root@your-ip-address`
8. Enter your password for the server. This is the password we set when you created the server (not the account!).
    - Remember it **does not show key presses, so you won't be able to see any feedback while typing**
9. After logging in, it should say `root@sam-networked-media:~# ` or something similar. *If it does not say `root` you are not in the correct location* 
10. In Terminal, navigate to your project4 folder
    - `cd project4/`
11. Run `npm install`
12. It will give an error that says you need a greater node version, so lets upgrade it.
13. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash`
14. Once nvm installs, copy this command into the prompt. This is the same suggestion that is printed to the console.

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

15. Then `nvm install 26`
16. Now you can test your bot is running normally.
    - `node bot.js`
12. In your browser, verify that the bot is running `https://networked-media.itp.io/@your-username`
13. In terminal, close the test server with CTRL+C
14. Once you have checked everything, now you need to get the bot to run permanently. 
    - `pm2 start bot.js --name project4`