# Week 3: 9/15

## Agenda

1. Web Application Infrastructure
2. Tutorial: Setting Up Digital Ocean

## Web Application Infrastructure

Tools we need for today:
- DigitalOcean account
- Cyberduck
- Node.js
- Windows only: GitBash
- GitHub Account
- A fork of `networked-media-starter` in your GitHub account and on your local computer. See [class 1 tutorial](https://github.com/samheckle/networked-media-fa-26/blob/main/class_01/class_01_notes.md#some-installation-setup) on how to do this.

### Defining some tools

- DigitalOcean: "Cloud Service Provider" → allows us to run applications by renting space on a computer
- Droplet: "Virtual Machine" → a specific computer we are rending on DigitalOcean
- Cyberduck: "FTP" File Transfer Protocol → a way to transfer files to our Droplet
- Node.js → The engine running our code.

<table>
    <tbody>
        <tr>
            <td> DigitalOcean </td>
            <td> Google Drive </td>
        </tr>
        <tr>
            <td> Droplet </td>
            <td> Folder in Drive  </td>
        </tr>
        <tr>
            <td> CyberDuck </td>
            <td> Uploading Files to Drive </td>
        </tr>
        <tr>
        <td>Node.js</td>
        <td>Using Unity or Unreal to run our code</td>
        </tr>
    </tbody>
</table>

### `localhost` vs. IP

#### Local:`localhost`

- using your personal computer as the server
- can only be accessed by _you_ on **your computer**
- `http://localhost:8080` or `http://127.0.0.1:8080`
- you _cannot_ submit these links to me, just as you cannot submit `file:///Users/...`

#### Cloud: IP Address

- using DigitalOcean as the server
- can be accessed by everyone who has the IP
- `http://198.199.76.114`
- It will always use `http`

## Tutorial: Setting up a Node project locally (on your computer)

Last time, we "forked" the [networked-media-starter](https://github.com/samheckle/networked-media-starter). Your file structure on your computer should look like:

```
networked-media/
├── class-demos/
├── webserver/
│   ├── server.js
│   ├── public
│   │   ├── project1/
│   │   ├── project2/
├── project3/
├── project4/
├── project5/
```

Open your `networked-media` folder in VS Code. Open a terminal in VS Code:

- Mac: Terminal menu in top right → New Terminal
- PC: Terminal menu in top right → New Terminal → In the new window on the bottom, there should be a button: [+ ⋎] → click ⋎ → Select GitBash

## Some useful commands

| Command                           | Action                                                                                                                                                                                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cd myfolder`                     | change directory to `myfolder`                                                                                                                                                                                                                        |
| `cd ..`                           | change directory one level back                                                                                                                                                                                                                       |
| `ls`                              | list contents of folder                                                                                                                                                                                                                               |
| `pwd`                             | print working directory                                                                                                                                                                                                                               |
| `mkdir newfolder`                 | create a folder named newfolder                                                                                                                                                                                                                       |
| `touch newfile.txt`               | create a file named newfile.txt                                                                                                                                                                                                                       |
| `rm -rf filename.txt .  `         | remove a file or folder                                                                                                                                                                                                                               |
| `mv filename.txt newfilename.txt` | rename a file                                                                                                                                                                                                                                         |
| `open .`                          | (macOS) open the current folder in Finder                                                                                                                                                                                                             |
| `explorer .`                      | (Windows) open the current folder in Explorer                                                                                                                                                                                                         |
| `ssh root@IP_ADDRESS`             | login to a remote computer (in our case our droplet). we specify the username on the left-side of `@`, but it will always be `root`. We specifiy the computer we are logging in to by the right side of the `@`, which will always be our ip address. |
See also [Sam Lavigne's Intro to the Command Line](https://scrapism.lav.io/intro-to-the-command-line/) or this command line cheat sheet [here](https://www.git-tower.com/blog/command-line-cheat-sheet/). 

Here are some useful key combinations as well:

| Key | Action |
|---|---|
|Up + Down Arrow keys | 	scroll through history
|Tab Key |	autocomplete
|CMD + CTRL + SPACE |(Mac OS) Emoji Keyboard
|CTRL + C | Stop action

In order to check whether `node` and `npm` were properly installed, run the following two commands (`-v` is a pretty standard command line argument for checking the version of a software):

`node -v` → this should output something like `v25.1.0`. Don’t worry if you have a different version.

`npm -v` → this should output something like `11.6.2`. Again, all good if your exact version is different.

We need to navigate to the `webserver` folder in the command line.

```sh
cd webserver
```

Once in this `webserver` folder, run:

```bash
npm init
```

and hit enter for all the questions you get asked (you can fill in answers, but the defaults work fine.) **This initializes our project as a Node project**.

Once the project is initialized, we need to install an external library called Express JS. [Express](http://expressjs.com/) is a small, easy to use framework which allows us to create web servers in node without having to write too much code. It’s the library that does all the heavy lifting in allowing us to create a web server.

Run the following command in order to add `express` as a dependency to the current project:

```bash
npm install express
```

At this point, if you run `ls`, you should see the following files in your folder:

- `node_modules` → this is the folder where all our project dependencies get saved. If you run `ls node_modules`, you will see a handful of results. `express` will be one of them, the other ones are dependencies of `express`.
- `package.json` → this is our node project configuration file. It specifies some metadata about our node project, as well as our dependencies. If you run `cat package.json`, you’ll be able to see that `express` appears under the `dependencies` section of the file.
- `package-lock.json` → we don’t care about this file, it’s used by node internally to keep track of exact library versions for the entire dependency tree.

This is the default barebones structure of a node project, so you should get used to seeing `node_modules` and `package.json` around. 

### Running your server (locally)

Start your web server by running the following command:

```bash
node server.js
```

You should see a message saying `Example app listening on port 80!` If by any chance you see a longer error instead, which mentions `Error: listen EACCES: permission denied 0.0.0.0:80`, run the server as superuser: `sudo node server.js`.
### Testing the server (locally)

Open a web browser and navigate to [http://localhost/test](http://localhost/test). You should see a simple page saying `Hello World!` → this is the result of the `/test` route we set up in `server.js`.

## Tutorial: Setting up a Node project on the cloud (DigitalOcean)

In order to have a website that’s publicly accessible on the Internet, it needs to be hosted on a computer with a static, [public IP address](https://help.keenetic.com/hc/en-us/articles/213965789-What-is-the-difference-between-a-public-and-private-IP-address-). Our laptops generally don’t have that — they get assigned private (or local) IPs when connecting to a WiFi (or wired) network, and the public IP is a few layers “above” in the network topology. While it’s possible to expose your laptop’s IP to the internet, it’s much easier to use services which offer that as a feature.

[Digital Ocean](https://digitalocean.com) is one such provider. A few alternatives are Amazon Web Services, Google Cloud Platform, or Microsoft Azure Cloud, but for this class we will use Digital Ocean.

Digital Ocean offers a suite of different services, but for now we are only interested in **Droplets**. A droplet is a Linux-based virtual machine (VM) which can be used for web hosting (and for many other things – for all intents and purposes, it’s a full computer capable of running any software that works on Linux.) Droplets, conveniently, also have publicly exposed IP addresses, so by the end of this tutorial we’ll have a website up and running _on the internet_.

**Note**: We are basically renting a virtual server from Digital Ocean, which generally costs money. The lowest-tier server we can rent costs $4 per month.

## 💧 Create a Digital Ocean droplet 💧

1. Log in to DigitalOcean and navigate to "Droplets": https://cloud.digitalocean.com/droplets
	1. It may prompt for you to make a project. Instead, navigate to https://cloud.digitalocean.com/projects/new and create a project with the name `networked-media` **(no spaces)**
2. Configure your droplet with the following. **Default** indicates no change required, unless it does not match:
	1. **Default** Choose a datacenter region: `New York * Datacenter1 * NYC1`
	2. **Default** Choose an image: `Ubuntu 24.04 (LTS) x64`
	3. Choose a Droplet Plan: Basic → Regular Disk Type: SSD → $4.00/mo
	4. Scroll down to Authentication
	5. Authentication: Password
		- ***Save this in a password manager!!!***
	6. Scroll down to Give your Droplet a name
		- Replace the text with something useful like `name-networked-media` **(no-spaces)**
	7. Select a project → the project you made in Step 1.

## ⚡ Connecting to your droplet ⚡

Congratulations, you now have a server running _in the cloud!_

In order to connect to it, we will use `ssh`. `ssh` stands for “Secure Shell”, and it’s a simple (and secure) protocol for connecting to a computer remotely. Through `ssh` we get access to the remote computer’s command line.

Open up your **Terminal** (or GitBash if you are on Windows,) and type the following command (replace `YOUR_IP` with the IP address your droplet shows in the Digital Ocean interface):

```bash
ssh root@YOUR_IP
```

You will be prompted for a password – that is the root password you set when creating the Droplet in the Digital Ocean interface.

***Write down `ssh root@YOUR_IP` with your password. We will use this command often***

In the command above, `root` is the user we are connecting as – it’s what the Digital Ocean droplet sets up for us as a default. There’s [more to say about what the root user is on Linux](https://en.wikipedia.org/wiki/Superuser), but we won’t go into details here.

## 💻 Initial droplet setup: Installing Node JS on your remote computer 💻

In order to host a website on the droplet, we need to run a web server. There are many different flavors of web servers out there, but for this class we are building our own (ish) using NodeJS. Node is a Javascript-based environment used for scripting and server-side applications. Simply put, it’s the thing (one thing) that allows us to run Javascript outside of the browser. We like that, because it means we don’t need to learn a different programming language for the website’s backend: everything can be Javascript.

In order to start using node, we first need to install it on the droplet. You only need to do this step once – after it’s installed, `node` will keep living on your droplet until you manually remove it. Run the following two commands (make sure you are in your droplet! The terminal prompt should look like `root@sam-networked-media # `. If it doesn't have `root` in the prompt, you need to do the `ssh` command from above.

```bash
sudo apt-get update
sudo apt-get install nodejs npm
sudo npm install --global pm2
```

Notice in the second command that we are installing a second package called `npm` in addition to node. `npm` stands for Node Package Manager, and it’s a small piece of software which makes it _extremely easy_ to use external libraries in node projects. You can learn more about `npm` [here](https://www.npmjs.com/).

In order to check whether `node` and `npm` were properly installed, run the following two commands (`-v` is a pretty standard command line argument for checking the version of a software):

`node -v` → this should output something like `v25.1.0`. Don’t worry if you have a different version.

`npm -v` → this should output something like `11.6.2`. Again, all good if your exact version is different.

## 🌐 Building and running the web server 🌐

### Uploading the files to your droplet

In the starter code, we have a file called `webserver/server.js`. Since we created this file on our own computer, with the convenience of a graphical user interface and a nice code editor, we need a way to upload it to the droplet.

[Cyberduck](https://cyberduck.io) is a piece of software which allows us to do that, using the `SFTP` protocol. `SFTP` stands for SSH File Transfer Protocol, and it’s a widely used protocol for transferring files over the internet.

_The Cyberduck instructions are MacOS specific. The software works on Windows too, but it has a different interface. Send me an email if you have trouble replicating these steps._

Once you’ve downloaded and opened Cyberduck, click on the “+” icon in the bottom-left of the window to establish a new connection.

In the dropdown at the top, pick the `SFTP (SSH File Transfer Protocol)` option, and give your connection a `nickname` in the field underneath. In the `server` field, enter the public IP address of your droplet – the same one you used to connect via ssh. Write `root` in the `username` field (remember from a previous section of this tutorial, our current user is called `root`), and type in your `password` in the next field. Once you’ve filled all these fields out, close the window.

Back in the main Cyberduck window, double-click on the newly added item, and a new Finder-like window will open, with the contents of your droplet in it.

Navigate to your local folder on your computer, and drag all of the contents inside your `networked-media` folder from your Finder window into the correct folder in the Cyberduck window. This will copy the files to the droplet.

### Running the server (on the cloud)

Going back to the Terminal, make sure your `ssh` connection to the droplet is still active, and, if it’s not, re-connect (`ssh root@123.456.etc`). Navigate to the project folder. When you type `ls`, you should now see the `server.js` file showing up alongside `package.json` and `node_modules`.

Start your web server by running the following command:

```bash
node server.js
```

You should see a message saying `Example app listening on port 80!` If by any chance you see a longer error instead, which mentions `Error: listen EACCES: permission denied 0.0.0.0:80`, run the server as superuser: `sudo node server.js`.

### Testing the server (on the cloud)

Open a web browser and navigate to `[http://your.ip.address.here/test](http://your.ip.address.here/test)` (`http://137.184.151.138/test` in my case). You should see a simple page saying `Hello World!` → this is the result of the `/test`. **Note using `http` instead of `https`**

## 💤 Keeping the web server alive (on the cloud) 💤

You will notice that if you close your terminal window, you won’t be able to access your website anymore.

This is because of how `ssh` and shell (aka terminal) sessions work. Once we connect to our droplet, we are given “a shell” – the terminal we write in, which is a child of the `ssh` connection. When we start our web server, that process becomes a child of the shell. So, when the `ssh` connection closes, all processes that are its children, grandchildren or further down the tree get closed as well.

In order to avoid that, we need an external utility which keeps our web server running even after we disconnect. There are a handful of options, but the one we will work with is called `pm2`.

Navigate to the folder where your web server lives, and, instead of starting your web server with the `node server.js` command, run the following:

```bash
pm2 start server.js
```

By doing this, `pm2` becomes the manager of our node web server, and, through black magic, it makes sure the server stays on even after you disconnect from `ssh`. Give it a try!

For the first few weeks, we won’t be making any changes to the server itself, so once you have this running, there’s no need to stop or restart the server. Files uploaded in the `public` folder will automatically get picked up and updated in the browser.

Once we start making changes to the server itself, we’ll learn some more about `pm2` and best development practices & workflows.

You might also need to check the status of your server:

```bash
pm2 ls
```

You can stop your server if there are any issues :)

```bash
pm2 stop all
pm2 restart server
```

You can also kill the server if for some reason stopping and restarting doesn't work

```bash
pm2 kill
```

## Setup Tasks: Only Done ONCE

1. creating accounts / installing software
2. install libraries on our droplet
   - install node on the droplet
   - install pm2 on the droplet
3. fork + clone the networked-media-starter repository

## Maintenance Tasks: Will Do OFTEN

_throughout the semester we will add these to our muscle memory_

1. Logging in and connecting to our droplet using `ssh root@your-ip-address`
2. Uploading files to Cyberduck
3. Running our server files using `pm2`

Many issues come from not knowing these basic commands! If you have a problem, always review the notes.