import Reminder from "../models/reminder.model.js";

export default async function listCommand(ctx, next) {
  if (ctx.message?.text !== "/list") return next();

  const reminders = await Reminder.find({ chatId: ctx.chat.id });

  if (reminders.length === 0) {
    return ctx.reply("📭 You have no active reminders.");
  }

  const formatted = reminders.map((r, index) => {
    /* =========================
       💊 MEDICINE REMINDER
       ========================= */
    if (r.type === "medicine") {
      const days =
        r.days && r.days.length > 0 ? `📅 Days: ${r.days.join(", ")}` : "";

      return (
        `💊 *${index + 1}. ${r.medicine}*\n` +
        `⏰ Time: ${r.times.join(", ")}\n` +
        `🔁 Repeat: ${r.repeat}\n` +
        `${days}`
      );
    }

    /* =========================
       💉 VACCINE REMINDER
       ========================= */
    if (r.type === "vaccine") {
      return (
        `💉 *${index + 1}. ${r.vaccine}*\n` +
        `📅 Date: ${r.date}\n` +
        `⏰ Time: ${r.time}\n` +
        `🧾 One-time vaccine reminder`
      );
    }
  });

  await ctx.reply(`📋 *Your Active Reminders*\n\n${formatted.join("\n\n")}`, {
    parse_mode: "Markdown",
  });
}
