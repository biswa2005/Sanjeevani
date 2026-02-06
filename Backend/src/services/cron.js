import cron from "node-cron";
import Reminder from "../models/reminder.model.js";
import bot from "../../server.js";
import { getISTTime, IST } from "./dayjs.js";

cron.schedule("* * * * *", async () => {
    const now = getISTTime().format("HH:mm");
    const today = getISTTime().format("dddd");
    setInterval( () => {
      console.log(`Checking reminders at ${now} on ${today}...`);
    }, 10000);
    const reminders = await Reminder.find();

    for (const r of reminders) {
      if (!r.times.includes(now)) continue;

      if (r.repeat === "weekly" && !r.days.includes(today)) continue;

      await bot.telegram.sendMessage(
        r.chatId,
        `💊 *Medicine Reminder*\n\n⏰ ${now}\nTake *${r.medicine}*`,
        { parse_mode: "Markdown" },
      );
    }
  },
  {
    timezone: IST, 
  },
);
