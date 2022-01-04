//Add all the env variables in this file.
import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
  discordBotToken: string | undefined;
  serpApiKey: string | undefined;
}

const config: IConfig = {
  discordBotToken: process.env.DISCORD_BOT_TOKEN,
  serpApiKey: process.env.SERPAPI_KEY,
};

export default config;
