# Discord-Delayed-Voice-Bot
## **BEFORE GETTING STARTED**
**The setup process for this bot can be tedious, especially if you plan to use it with many participants simultaneously.
The reason as to why can be seen at the very bottom of this page. If you have never registered a Discord Bot before, 
please follow [this guide](https://www.freecodecamp.org/news/create-a-discord-bot-with-python/).**
## About
The Discord-Delayed-Voice-Bot is a chaos inducing Discord bot that aims to annoy every 
participating user in a voice channel. The bot achieves this by delaying the voices of each user
by a given amount of time. 

### How does it work
- When the bots are deployed, a bot will be assigned to a user in the
voice channel and will change their name to `AssignedUser's Bot` and will also change their avatar
to the same avatar of their assigned user. 
- Every person in the channel **MUST** manually mute each other so that they can only hear the voices coming out of the bots.
Users can also mute their own bot if they do not wish to hear their own voice echoed to themself, though I recommend against it
to ensure that your voice was sent properly.
- Chaos then ensues
### Additional Notes
- A 3000 millisecond delay is a good place to start. 
- Users must keep in mind that the round trip delay of messages will be double of the set delay time (ex. a 3s delay will have a 6s round trip delay).
So if you tell your friend that something, you won't get a reply until (delay * 2) time has passed. 
- **Increase the delay time with caution**

## Usage
### Deploying the Bot (Single):
To initiate voice delay for a single user, join a voice channel and type the following command into 
any available text channel:

    !delay

This will summon the **'Bot Commander'** into your current voice channel and begin delaying
the voice of the summoner.

### Deploying the Bots (Multiple):
To initiate voice delay for multiple users, have the users join a voice channel and have only one of 
the participants type the following command into any available text channel:

    !delay-bots

This will summon all of the available **'Delay Bots'** into your current voice channel. Each bot 
will automatically assign themself to a specific user and will begin delaying their user's voice.

### Dismissing the Bot(s):
When the session is completed, type the following command to dismiss the deployed bots:

    !disconnect
If a user leaves a voice channel during the voice delay process, their assigned bot will automatically disconnect. 
## Installation
### Requirements:
- [Node.js](https://nodejs.org/)
- [Discord Bot Application](https://discord.com/developers/applications) - **IMPORTANT NOTE:** 1 bot is the very least amount required for functioning.
This first bot will be fulfilling the role of the **'Bot Commander'**. The **Bot Commander** will be the one deploying the other **'Delay Bots'**
when delaying multiple voices simultaneously. If you plan on using this with multiple users at the same time, then more bots are 
required to be registered (please see **IMPORTANT NOTE** at the bottom of this page). 

### Guide:
- Clone this repository.
- Run the `npm install` command in a terminal from this project's directory.
- Create a [Discord Bot Application](https://discord.com/developers/applications) 
(follow [this guide](https://www.freecodecamp.org/news/create-a-discord-bot-with-python/) if you have never created one before), 
then create a bot, paste the bot's token into the `dotenv-env` file under `BOT_TOKEN=`, and invite it to your server with Administrator permissions. 
This first bot will be acting as your **BOT COMMANDER**.
- If you are planning on delaying several users at the same time, then the creation of more [Discord Bot Application](https://discord.com/developers/applications) 
will need to be repeated for the amount of users that are planned to be delayed (ex. for 4 user, repeat 4 times). These bots will be acting as your **'Delay Bots'**. 
After each creation, paste the bot's token under `WORKER_BOT_TOKENS=`. If there are more than 1 worker bot, then the tokens will need to be separated with a comma ( , ). 
An example of this can be seen in the `dotenv-example` file.
- A delay time is now needed to be set in the `dotenv-example` file under `DELAY=`. This delay is represented in milliseconds, so if you want to have a delay of 3 seconds,
`3000` will need to be set in the file. If you want the delay to be random, then set the value of `RANDOM` (random delays have a range of 0 - 5 seconds).
- Rename the `dotenv-example` file to `.env`.
- To run, enter `npm start` in a terminal from the project's directory. An `app.log` will be created in the project directory for logging purposes.

## IMPORTANT NOTE
For every user in a voice channel that desires to have their voices delayed, a discord bot needs to be created
in addition to the creation of the **Bot Commander**. For example, **5 total bots** are required to delay the voices of **4 users** in a voice channel 
(1 for the **Bot Commander** and 4 **Delay Bots**).