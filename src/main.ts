//  main.ts is the entry point to the application
import config from "./config";
import { Client, Intents } from "discord.js";

//TODO: Add a loging library

if (!config.discordBotToken) {
  throw new Error("Couldn't configure the environment variables");
}

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready
client.once("ready", (c) => {
  console.log(`DiscordOverflow joined as ${c.user.tag}`);
});

// Login to Discord with token
client.login(config.discordBotToken);
