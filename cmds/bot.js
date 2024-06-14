module.exports = {
  config: {
    name: "bot",
    version: "1.0",
    author: "Jaychris Garcia",
    countDown: 5,
    role: 0,
    shortDescription: "sarcasm",
    longDescription: "sarcasm",
    category: "reply",
  },
  onStart: async function () {},
  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() == "bot") {
      const messages = [
        "I'm here! What's up, buttercup? 😄",
        "Beep boop! Did someone call for a bot? 🤖",
        "Hey there! You rang? Ready to assist! 🚀",
        "Bot reporting for duty! What's on your mind? 🛠️",
        "Yes, it is I, the magnificent bot! How can I be of service? 🎩✨",
        "Knock knock! Who's there? It's me, your friendly neighborhood bot! 😄👋",
        "Hey hey! It's bot o'clock! What can I do for you today? ⏰",
        "Greetings! I come in peace, armed with algorithms and puns! 🌌🤖",
        "Hello, human! Ready to have some bot-tastic fun? 🎉🤖",
        "Beep beep! It's bot time! What's the scoop? 🚗💨",
        "You've summoned the bot! Prepare for witty banter and helpful responses! 💬🤖",
        "Bot at your service! Let's make some digital magic happen! 🌟🔮",
        "It's bot-a-clock! Time for some digital shenanigans! ⏰😄",
        "Who dares to awaken the mighty bot from its slumber? Let the fun begin! 💤🎉",
        "Attention, human! The bot has been activated! Let's get this party started! 🚀🎈",
        "Did someone say 'bot'? You betcha! Let's dive into the realm of zeros and ones! 🎲💻",
        "Greetings, Earthling! Your wish is my command. What can I do for you today? 🌍🤖",
        "Beepity beep! The bot is here to bring joy, laughter, and maybe a few errors along the way! 🤖😄",
        "Ahoy there! The bot sails in on a sea of code and caffeine. What's the mission? ⚓💻",
        "You've discovered the secret passphrase! Welcome to the realm of bot-dom! 🎩🤖",
        "Knock knock! Who's there? Bot! Bot who? Bot you glad to see me? 😄🤖",
        "Greetings, human friend! How may I assist you today in your quest for knowledge? 🚀📚",
        "I've been summoned! Let's make some algorithmic magic happen! ✨🔮",
        "Hello, hello! Ready for some bot-tastic adventures? Let's roll! 🤖🎢",
        "Beep beep! Bot's in the house! What's the word, hummingbird? 🏠🤖",
        "Ahoy there, matey! The bot be ready to set sail on the sea of queries! ⛵🌊",
        "Greetings, traveler! Welcome to the realm of the bot. How may I assist you on your journey? 🌌🤖",
        "The bot hath arrived! Prepare thyself for a journey into the digital unknown! 🛸🤖",
        "Beep boop! Ready to assist with all your digital dilemmas! 💻🤖",
        "Bot mode activated! Let's tackle those tasks and conquer the digital realm! 💥🤖",
        "Hello there! The bot is at your service. What can I do for you today? 👋🤖"
      ];

      const randomIndex = Math.floor(Math.random() * messages.length);
      const randomMessage = messages[randomIndex];

      return message.reply(randomMessage);
    }
  },
};
