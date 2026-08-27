import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import { Telegraf } from "telegraf";
import express from "express";
import dotenv from "dotenv";

import startCommand from "./src/commands/start.command.js";
import reminderCommand from "./src/commands/reminder.command.js";
import "./src/services/cron.js";
import listCommand from "./src/commands/list.command.js";
import deleteCommand from "./src/commands/delete.command.js";
import askCommand from "./src/commands/chat.command.js";
import healthcareCommand from "./src/commands/hospital.command.js";
import helpCommand from "./src/commands/help.command.js";


dotenv.config();
import connectDB from "./src/services/db.js";
const app = express();
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Sanjeevani Bot API! The bot is running and ready to assist you with your health needs.",
  );
});

import { processMedicalChat } from "./src/controllers/chatpipeline.js" // Adjust path if needed

app.post("/chatpipeline/translate", async (req, res) => {
  // Extract the Hindi input text from the request body
  const userText = String(req.body?.text || "").trim();
  
  if (!userText) {
    return res.status(400).json({
      error: "Request body must include a non-empty 'text' field.",
    });
  }

  try {
    // Run the text through the end-to-end LangChain medical pipeline
    const result = await processMedicalChat(userText);
    
    // Return the full diagnostic object back to the client/Postman
    return res.status(200).json(result);
  } catch (err) {
    console.error("chatpipeline translate POST error:", err);
    return res.status(500).json({ 
      error: "Failed to process medical translation request.", 
      details: err.message 
    });
  }
});

// // Direct translation test endpoint
// app.post("/chatpipeline/test-translate", async (req, res) => {
//   const { text, lang } = req.body;
  
//   if (!text || !lang) {
//     return res.status(400).json({ error: "Provide 'text' and 'lang' fields" });
//   }

//   try {
//     const { translateFromEnglish } = await import("./src/controllers/chatpipeline.js");
//     const result = await translateFromEnglish(text, lang);
//     return res.json({ 
//       input: text, 
//       targetLang: lang, 
//       output: result,
//       success: result !== text
//     });
//   } catch (err) {
//     console.error("Direct translation test failed:", err);
//     return res.status(500).json({ error: err.message });
//   }
// });


app.listen(process.env.PORT || 3000, () => {
  console.log(
    `🚀 Server is running on port https://localhost:${process.env.PORT || 3000}`,
  );
});
export default bot;
