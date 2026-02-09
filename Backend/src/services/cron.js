import cron from "node-cron";
import Reminder from "../models/reminder.model.js";
import bot from "../../server.js";
import { getISTTime, IST } from "./dayjs.js";

cron.schedule(
  "* * * * *",
  async () => {
    const now = getISTTime().format("HH:mm");
    const today = getISTTime().format("dddd");
    const todayDate = getISTTime().format("YYYY-MM-DD");

    const reminders = await Reminder.find();

    for (const r of reminders) {
      /* =========================
       💊 MEDICINE REMINDERS
       ========================= */
      if (r.type === "medicine") {
        if (!r.times.includes(now)) continue;
        if (r.repeat === "weekly" && !r.days.includes(today)) continue;

        await bot.telegram.sendMessage(
          r.chatId,
          `💊 *Medicine Reminder*\n\n⏰ ${now}\nTake *${r.medicine}*`,
          { parse_mode: "Markdown" },
        );
      }

      /* =========================
       💉 VACCINE (ONE-TIME)
       ========================= */
      if (r.type === "vaccine") {
        if (r.date !== todayDate || r.time !== now) continue;

        await bot.telegram.sendMessage(
          r.chatId,
          `💉 *Vaccine Reminder*\n\n📅 Today\n⏰ ${now}\nPlease take *${r.vaccine}*`,
          { parse_mode: "Markdown" },
        );

        // 🔥 AUTO DELETE AFTER NOTIFY
        await Reminder.deleteOne({ _id: r._id });
      }
    }
  },
  { timezone: IST },
);
