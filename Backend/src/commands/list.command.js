import Reminder from "../models/reminder.model.js";

export default async function listCommand(ctx, next) {
  if (ctx.message?.text === "/list") {
    const medicines = await Reminder.find({ chatId: ctx.chat.id }).select(
      "medicine times repeat days",
    );
    if (medicines.length === 0) {
      ctx.reply("You have no medicine reminders set.");
    } else {
      const reminderList = medicines
        .map((m) => {
          const days = m.days.length > 0 ? `📅 ${m.days.join(", ")}` : "";
          return `💊 *${m.medicine}*\n⏰ Time: ${m.times}\n🔄 Repeat: ${m.repeat}\n${days}`;
        })
        .join("\n\n");
      ctx.reply(`📋 *Your Reminders*\n\n${reminderList}`, {
        parse_mode: "Markdown",
      });
    }
  }
  next();
}
