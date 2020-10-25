<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=300px src="https://imgur.com/ciey6EG.jpg" alt="Project logo"></a>
</p>


<h1 align="center">No Onlyfans Bot</h1>
<h1 align="center">🚫💦🤖</h1>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---


## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
  - [Prerequisites](#prereq)
  - [Setting Up Your Script App](#script_app)
  - [Environment Variables](#env_var)
  - [Environment Variables](#env_var)
- [Usage](#usage)


# About <a name = "about"></a>

This bot uses the *___SubMonitor___* functionality, which watches your subreddits 'New' section for all the latests posts. The bot will check the profile of every user who posts, and search for the existance of the word *onlyfans* in their public description. If the word exists, the bot will flag the post as spam and remove it.



# Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine.

## Prerequisites <a name = "prereq"></a>

This project is built with Node.JS. Download the latest version [here](https://nodejs.org/en/download/). Now download the code from this repo and use `npm i` to install the dependencies required to develop and run your bot.


## Setting Up Your Script App <a name = "script_app"></a>

You'll have to create a new account for your bot before you move any further.\
Once the account is created, log in, go to [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) to fill out the form to create a new script app.


<img src='https://i.imgur.com/yq8akJ7.png'>

## Environment Variables <a name = "env_var"></a>
-----

Now that you've set up your bot account and created a script app, it's time to download the source code and paste in your environment variables.\
Also have open reddit.com/prefs/apps as you'll need to copy & paste the items you'll find there.

<br>

__USER_AGENT__ is just a name that the server will identify your bot by. It can be whatever you want.\
__CLIENT_ID__ and __CLIENT_SECRET__ are fround in prefs/apps.\
__REDDIT_USER__ is your bots username.\
__REDDIT_PASS__ is its password.\
__MASTER_SUB__ is the name of the subreddit the bot will function on.\
__DEBUG_NETWORK__ may be set to false unless any problems arise.\
__STARTUP_LIMIT__ will cause the bot to check this many items on the first sweep. Setting this value higher will ensure that when stopping and restarting the bot, no requests are forgotten. This value may be set up to 100\
__SUBMISSION_LIMIT__ Will limit the amount of posts the bot will find on its next sweeps after the first.\
__INTERVAL__ The time (in minutes) for which the bot should sleep between doing its job again.\
__TEST_FOR__ The word the bot will test for. In case it finds this word in the public description of the user posting, their post will be flagged and removed.



```javascript
USER_AGENT="YOUR BOT'S NAME"
CLIENT_ID="FROM PREFS/APPS"
CLIENT_SECRET="FROM PREFS/APPS"
REDDIT_USER="YOUR BOT'S USERNAME"
REDDIT_PASS="YOUR BOT'S PASSWORD"
MASTER_SUB='Bwz3rBot'
DEBUG_NETWORK='false'
STARTUP_LIMIT='1'
SUBMISSION_LIMIT='50'
INTERVAL='3'
TEST_FOR='onlyfans'
```


    


Once these fields are completely filled out, remove <i>EXAMPLE</i> from the end of the filename.


> pw.envEXAMPLE = pw.env
_____

## Usage <a name = "env_var"></a>

First install the dependencies by double-clicking __install.bat__ or running this command: `npm i`

Now you may run the bot by double-clicking __run.bat__ or running this command: `node src/bot.js`