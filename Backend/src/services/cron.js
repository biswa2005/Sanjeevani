import cron from "node-cron";
import Reminder from "../models/reminder.model.js";
import bot from "../../server.js";
import { getISTTime, IST } from "./dayjs.js";

cron.schedule(
  "* * * * *",
  async () => {
    try {
      if (!bot) return;

      const now = getISTTime().format("HH:mm");
      const todayDate = getISTTime().format("YYYY-MM-DD");
      // Convert current day to lowercase so it matches the DB format
      const today = getISTTime().format("dddd").toLowerCase();

      // 👀 LOGGING: Check if the cron job is running every minute
      console.log(`🕒 [CRON] Checking for reminders at ${now} on ${todayDate}...`);

      // Optimization: Fetch only reminders scheduled for this exact minute
      const reminders = await Reminder.find({
        $or: [
          { type: "medicine", times: now },
          { type: "vaccine", date: todayDate, time: now },
        ],
      });
      
      // Optional: Log if it found any reminders this minute
      if (reminders.length > 0) {
        console.log(`🔔 [CRON] Found ${reminders.length} reminder(s) to send!`);
      }

      for (const r of reminders) {
        /* =========================
           💊 MEDICINE REMINDERS
           ========================= */
        if (r.type === "medicine") {
          // Check for weekly medicine days
          if (r.repeat === "weekly" && !r.days.includes(today)) continue;

          await bot.telegram.sendMessage(
            r.chatId,
            `💊 *Medicine Reminder*\n\n⏰ ${now}\nTime to take *${r.medicine}*`,
            { parse_mode: "Markdown" }
          );
        }

        /* =========================
           💉 VACCINE (ONE-TIME)
           ========================= */
        if (r.type === "vaccine") {
          await bot.telegram.sendMessage(
            r.chatId,
            `💉 *Vaccine Reminder*\n\n📅 Today\n⏰ ${now}\nPlease take *${r.vaccine}*`,
            { parse_mode: "Markdown" }
          );

          // Auto delete after the vaccine reminder sends
          await Reminder.deleteOne({ _id: r._id });
        }
      }
    } catch (error) {
      console.error("❌ Cron Job Error:", error);
    }
  },
  { timezone: IST }
);