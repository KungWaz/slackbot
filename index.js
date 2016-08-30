const SlackBot = require('slackbots');
const { random } = require('@kungwaz/slackbot-compliments');

// create a bot
const bot = new SlackBot({
    token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'KungBot'
});

bot.on('start', function() {
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('kungchannel', 'Hello!', { icon_emoji: ':star:' });
});

// The current compliment
let currentCompliment = 0;

bot.on('message', function(data) {
  // We define a RegExp pattern the bot is looking for
  // In this case it is looking for messages of the form "[Cc]ompliment @username"
  // The [Cc] means that we accept the message to start with either a large C or a small c.
  const pattern = /[Cc]ompliment <@(\w+)>/
  if (data.text && data.text.match(pattern)) {
    // If the message matches the pattern, the user ID is extracted from the message
    const user = data.text.match(pattern)[1];

    if (user) {
      // The bot gets the user name from the user ID, and attempts to send the user a random complement
      // We will now get a random compliment from our module
      bot.getUserById(user).then(({ name }) => {
        bot.postMessageToUser(name, random());
      });
    }
  }
});
