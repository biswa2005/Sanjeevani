import Reminder from "../models/reminder.model.js";

export default async function reminderCommand(ctx, next) {
  if (!ctx.message?.text?.startsWith("/remind")) return next();

  const parts = ctx.message.text.split(" ");

  if (parts.length < 4) {
    return ctx.reply("❌ Invalid format. Use /start for help");
  }

  const medicine = parts[1].toLowerCase();
  const times = parts[2].split(",");
  const repeat = parts[3];
  const days = parts[4] ? parts[4].split(",") : [];

  await Reminder.create({
    chatId: ctx.chat.id,
    medicine,
    times,
    repeat,
    days,
  });

  ctx.reply(
    `✅ Reminder saved!\n\n💊 ${medicine}\n⏰ ${times.join(", ")}\n🔁 ${repeat}`,
    { parse_mode: "Markdown" },
  );
};
