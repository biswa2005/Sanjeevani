import Reminder from "../models/reminder.model.js";

export default async function reminderCommand(ctx, next) {
  if (!ctx.message?.text?.startsWith("/remind_medicine")) return next();

  const parts = ctx.message.text.split(" ");

  /* =========================
     VACCINE MODE
     ========================= */
  if (parts[1] === "vaccine") {
    if (parts.length < 5) {
      return ctx.reply(
        "❌ Invalid vaccine format\n\nUse:\n/remind vaccine <name> <YYYY-MM-DD> <HH:MM>\n\nExample:\n/remind vaccine Covaxin 2026-03-15 10:30",
      );
    }

    const vaccine = parts[2];
    const date = parts[3];
    const time = parts[4];

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return ctx.reply("❌ Date must be YYYY-MM-DD");
    }

    if (!/^\d{1,2}:\d{2}$/.test(time)) {
      return ctx.reply("❌ Time must be HH:MM");
    }

    await Reminder.create({
      chatId: ctx.chat.id,
      type: "vaccine",
      vaccine,
      date,
      time,
    });

    return ctx.reply(
      `✅ Vaccine scheduled!\n\n💉 ${vaccine}\n📅 ${date}\n⏰ ${time}`,
      { parse_mode: "Markdown" },
    );
  }

  /* =========================
     MEDICINE MODE (YOUR EXISTING LOGIC)
     ========================= */

  if (parts.length < 4) {
    return ctx.reply(
      "❌ Invalid format. Use /remind_medicine <medicine_name(e.g:- calpol)> <time (e.g:- 9:00, 23:00)> <frequency(e.g:- daily, weekly)> <days(e.g:-Monday)>",
    );
  }

  const medicine = parts[1].toLowerCase();
  const times = parts[2].split(",");
  const repeat = parts[3];
  const days = parts[4] ? parts[4].split(",") : [];

  if (!medicine) {
    ctx.reply("❌ Medicine name is required.");
    return;
  }
  if (times.some((t) => !/^\d{1,2}:\d{2}$/.test(t))) {
    ctx.reply("❌ Time must be in HH:MM format.");
    return;
  }
  if (!["daily", "weekly", "monthly"].includes(repeat)) {
    ctx.reply("❌ Frequency must be daily, weekly, or monthly.");
    return;
  }
  if (repeat === "weekly" && days.length === 0) {
    ctx.reply("❌ Weekly reminders require at least one day.");
    return;
  }

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
}
