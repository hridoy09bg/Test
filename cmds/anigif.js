const fetch = require('node-fetch');
const fs = require('fs-extra');

module.exports = {
    config: {
        name: "anigif",
        version: "1.1",
        author: "SiAM",
        role: 0,
        category: "Fun",
        shortDescription: "bot will send you anime gif based on tag.",
        longDescription: "bot will send you anime gif based on tag.",
        guide: {
            en: "{pn} <tag> |type only {pn} to see tag list",
        }
    },

    onStart: async function ({ api, args, message, event }) {
        const availableTags = [
            "bite", "blush", "comfy", "cry", "cuddle", "dance", "eevee", "fluff", "holo", "hug",
            "icon", "kiss", "kitsune", "lick", "neko", "okami", "pat", "poke", "senko", "sairo",
            "slap", "smile", "tail", "tickle", "anal", "blowjob", "cum", "fuck", "pussylick", "solo",
            "threesome_fff", "threesome_ffm", "threesome_mmf", "yaio", "yuri"
        ];

        const tag = args[0];

        if (!tag || !availableTags.includes(tag)) {
            const invalidTagMessage = `Invalid tag "${tag}" ⚠️.\nPlease use :\n${availableTags.join(', ')}.`;
            return message.reply(invalidTagMessage);
        }

        const nsfwTags = [
            "anal", "blowjob", "cum", "fuck", "pussylick", "solo", "threesome_fff", "threesome_ffm",
            "threesome_mmf", "yaio", "yuri"
        ];
        const isNsfw = nsfwTags.includes(tag);

        if (isNsfw) {
            const msgSend = await message.reply("This tag is not allowed in this thread.");
            setTimeout(() => {
                api.unsendMessage(msgSend.messageID);
            }, 10000);
            return;
        }

        const endpoint = isNsfw
            ? `https://purrbot.site/api/img/nsfw/${tag}/gif`
            : `https://purrbot.site/api/img/sfw/${tag}/gif`;

        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error("Failed to get image.");
            }

            const data = await response.json();
            const gif = data.link;

            const gifResponse = await fetch(gif);
            const buffer = await gifResponse.buffer();

            const gifPath = `${tag}_anime.gif`;
            await fs.writeFile(gifPath, buffer);

            message.reply({
                body: ` ${tag} 😗👇🤐 !`,
                attachment: fs.createReadStream(gifPath)
            }, () => {
                fs.unlink(gifPath, (err) => {
                    if (err) console.error(`Failed to delete ${gifPath}:`, err);
                });
            });
        } catch (error) {
            console.error('Error fetching or sending the GIF:', error.message);
            message.reply("Failed to get image. Please try again later.");
        }
    }
};
