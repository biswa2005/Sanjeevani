import { Telegraf } from "telegraf";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/services/db.js";
import startCommand from "./src/commands/start.command.js";
import reminderCommand from "./src/commands/reminder.command.js";
import "./src/services/cron.js";
import listCommand from "./src/commands/list.command.js";
import deleteCommand from "./src/commands/delete.command.js";
import askCommand from "./src/commands/chat.command.js";
import healthcareCommand from "./src/commands/hospital.command.js";
import helpCommand from "./src/commands/help.command.js";

dotenv.config();

const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);
console.log("🤖 Starting the bot...");

bot.hears(["hi", "hello"], (ctx) =>
  ctx.reply(`👋 Hi there! Welcome to Sanjeevani🌿,
    I’m here to help you with medicines, reminders, and health support.
    Just type a command or use the menu to get started!`),
);

bot.use(startCommand);
bot.use(helpCommand);
bot.use(askCommand);
bot.use(reminderCommand);
bot.use(listCommand);
bot.use(deleteCommand);
bot.use(healthcareCommand);

connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

bot.launch().catch((err) => {
  console.error("Bot launch failed:", err);
  process.exit(1);
});

console.log("🤖 Bot is up and running...");
process.on("SIGINT", () => bot.stop());
process.on("SIGTERM", () => bot.stop());

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server is running on port https://localhost:${process.env.PORT || 3000}`);
});
export default bot;
