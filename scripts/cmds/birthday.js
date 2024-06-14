const axios = require('axios');

module.exports = {
  config: {
    name: "bdy",
    aliases: ["instagram"],
    version: "1.0",
    author: "Munem",
    countDown: 2,
    role: 0,
    shortDescription: "insta videos",
    longDescription: "download Instagram video",
    category: "media",
    guide: "{pn} {{<link>}}"
  },

  onStart: async function ({ message, args }) {
    const userInput = args.join(" ").trim();

    // If user input is empty, prompt for a birthday in the correct format
    if (!userInput) {
      return message.reply(`Please enter a birthday in the format dd-mm-yyyy.`);
    }

    // Validate user input for the correct date format
    const isValidInput = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(userInput);
    if (!isValidInput) {
      return message.reply(`Please enter a birthday in the format dd-mm-yyyy.`);
    }

    const [day, month, year] = userInput.split("-");
    const isDateValid = isValidDate(day, month, year);

    // If the input doesn't match the format "dd-mm-yyyy" or if it's not a valid date, prompt for correct input
    if (!isDateValid) {
      return message.reply(`Please enter a valid birthday in the format dd-mm-yyyy.`);
    }

    const formattedDate = `${day}-${month}-${year}`; // API expects dd-mm-yyyy format
    const API_URL = `https://news.orgasom.shop/api/birthday.php?date=${formattedDate}`;

    try {
      await message.reply(`Please wait...`); // Send "Please wait" message

      const response = await axios.get(API_URL);
      if (response.data.success) {
        message.reply(`Your birthday countdown is here: ${response.data.url}`); // Send the response URL with a text message
      } else {
        message.reply(`Failed to fetch birthday information.`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.reply(`Failed to fetch birthday information.`);
    }
  }
};

// Function to check if the given date is valid
function isValidDate(day, month, year) {
  const date = new Date(`${year}-${month}-${day}`);
  return !isNaN(date.getTime());
}
