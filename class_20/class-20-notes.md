
## Agenda

1. Reading Discussion #7
2. Moderation and Community Maintenance 
3. Tutorial: Putting it all together and uploading to droplet

---
## Moderation and Community Maintenance 


In 2024, on August 9th, there was rumour of an aquarium in BedStuy, a neighborhood in Brooklyn.

<img src="https://github.com/samheckle/images/blob/main/aquarium.png?raw=true" style="width:400px">

And there were some complaints posted in a [reddit thread](https://www.reddit.com/r/BedStuy/comments/1elrbju/fish_in_puddle_on_tompkins_and_hancock_animal/)

<img src="https://github.com/samheckle/images/blob/main/fish-puddle1.png?raw=true" style="width:400px">

<img src="https://github.com/samheckle/images/blob/main/fish-puddle2.png?raw=true" style="width:400px">

<img src="https://github.com/samheckle/images/blob/main/fish-puddle3.png?raw=true" style="width:400px">

A local newspaper picked this story up...

<img src="https://github.com/samheckle/images/blob/main/community.png?raw=true" style="width:400px">

And OP concluded their thread...

<img src="https://github.com/samheckle/images/blob/main/local-thread.png?raw=true" style="width:400px">

<img src="https://github.com/samheckle/images/blob/main/local-leadership.png?raw=true" style="width:400px">

But this was originally posted in the BedStuy subreddit

<img src="https://github.com/samheckle/images/blob/main/bedstuy.png?raw=true" style="width:400px">

And picked up by a "local newspaper"

<img src="https://github.com/samheckle/images/blob/main/local-newspaper.png?raw=true" style="width:400px">

Which exposed, and removed a lot of context, of a neighborhood issue. There are a lot of factors at play! And it became almost a globalized issue where everyone has an opinion. 

See [The Gamification of Public Discourse](https://youtu.be/1LpbGW3qLVg?si=K_KZqrUIqX7uxWva)

**does a neighborhood have official leadership?**
**how would that be designated?**

<details>

<summary>Fate of the Aquarium</summary>

On [October 25th](https://hellgatenyc.com/city-paved-over-bed-stuy-aquarium/), the city paved over the aquarium. 

<img src="https://github.com/samheckle/images/blob/main/paved.png?raw=true" style="width:400px">

**did the government act in the neighborhood's best interest?**

</details>

## Discussion

### What defines good moderation and community building?

- take 5 minutes to quietly write down what you think makes good moderation
    - what is required of users? what is required of maintainers/admins?
- where are examples of what you see as active / passive moderation?
    - an active example: deleting NSFW on a kitten forum
    - a passive example: on Bilibili the prompt “Leave a kind comment”

We will present these as a class and write them down.

### What rules do we want to define for our own community?

We will collectively be modifying the [server rules](https://networked-media.itp.io/about) to determine:

- how often are bots allowed to post (every hour, 10 minutes, 30 min, once a day, etc). this is minimum time to prevent spam
- other rules we define

## Putting it all together

Download the [starter code](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2Fsamheckle%2Fnetworked-media-fa-26%2Ftree%2Fmain%2Fclass_20%2Fclass_20_starter)

We will be adding the final piece of the puzzle: making a fetch request to your partner's data inside `bot.js`. This is building on top of the `class_20_starter/` code. 

Part 1 - Adding data to database:

- Start your server. This can be local or this can be on the Droplet. The sooner you upload to the Droplet, the sooner your partner has access to the data.
    - Uploading and running `server.js` is the same as Project 3, but we will be uploading to Project 4 instead. See [Making your website live](https://github.com/samheckle/networked-media-fa-26/blob/main/class_15/class-15-notes.md#making-your-website-live).
- Navigate to your form. This will likely be `http://localhost:6003/` or `http://your-ip-address:6003/`.
- Upload your dataset via the form. If you have different or additional fields, you will need to include them in the form file.
- Check your dataset is live via `http://localhost:6003/get-data` or `http://your-ip-address:6003/get-data`. The link with your ip address will be the one you share with your partner.

Part 2 - Updating your bot with your partner's data:

- In `.env`: include your API token (Retrieved from [Account Preferences → Development](https://networked-media.itp.io/settings/applications) → Click your token name → Copy Access Token)
- In `bot.js`: under the comment ["TODO ADD API REQUEST"](https://github.com/samheckle/networked-media-fa-26/blob/main/class_20/class_20_starter/bot.js#L22), add your request to your partners server.
    - Note: It will look exactly like [class 19](https://github.com/samheckle/networked-media-fa-26/blob/main/class_19/class-19-demo/public/main.js#L9), replacing `localhost` with your partner's Droplet IP address.
    - Note: Make sure the port number in the URL matches your partner's `app.listen`.
    - Note: Your partner's server needs to be up and running for you to make requests to it.
- In `bot.js`: under the comment ["TODO SELECT ITEM FROM JSON"](https://github.com/samheckle/networked-media-fa-26/blob/main/class_20/class_20_starter/bot.js#L32), manipulate the retrieved data by grabbing the json. This will be similar to [class 18 demo](https://github.com/samheckle/networked-media-fa-26/blob/main/class_18/class-18-demo/bot.js#L27). The json data that you are parsing is an array.
- In `bot.js`: when you are ready to have your bot be public, change the [visibility property](https://github.com/samheckle/networked-media-fa-26/blob/main/class_20/class_20_starter/bot.js#L17) to `"public"`

### Uploading to droplet & updating Node.js

See [Class 18 notes](https://github.com/samheckle/networked-media-fa-26/blob/main/class_18/class-18-notes.md#uploading-to-droplet)
