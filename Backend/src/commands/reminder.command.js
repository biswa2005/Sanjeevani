import Reminder from "../models/reminder.model.js";

export default async function reminderCommand(ctx, next) {
  if (!ctx.message?.text?.startsWith("/remind")) return next();

  const parts = ctx.message.text.split(" ");

  /* =========================
     VACCINE MODE
     ========================= */
  if (parts[1] === "vaccine") {
    if (parts.length < 5) {
      return ctx.reply(
        "❌ Invalid vaccine format\n\nUse:\n/remind vaccine <name> <YYYY-MM-DD> <HH:MM>\n\nExample:\n/remind vaccine Covaxin 2026-03-15 10:30"
      );
    }

    const vaccine = parts[2];
    const date = parts[3];
    
    // Fix: Pad single digit hours (e.g., "9:30" -> "09:30")
    let [vHour, vMinute] = parts[4].split(":");
    const time = `${vHour.padStart(2, "0")}:${vMinute}`;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return ctx.reply("❌ Date must be YYYY-MM-DD");
    }

    if (!/^\d{2}:\d{2}$/.test(time)) {
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
      { parse_mode: "Markdown" }
    );
  }

  /* =========================
     MEDICINE MODE
     ========================= */
  if (parts.length < 4) {
    return ctx.reply(
      "❌ Invalid format. Use:\n/remind <medicine_name> <time> <frequency> <days>\n\nExample:\n/remind Calpol 09:00,21:00 daily"
    );
  }

  const medicine = parts[1].toLowerCase();
  const repeat = parts[3].toLowerCase();
  
  // Fix: Pad all times to guarantee HH:mm matching
  const times = parts[2].split(",").map(t => {
    let [hour, minute] = t.split(":");
    return `${hour.padStart(2, "0")}:${minute}`;
  });

  // Fix: Lowercase and trim all days to prevent casing mismatches
  const days = parts[4] 
    ? parts[4].split(",").map(d => d.trim().toLowerCase()) 
    : [];

  if (!medicine) {
    return ctx.reply("❌ Medicine name is required.");
  }
  if (times.some((t) => !/^\d{2}:\d{2}$/.test(t))) {
    return ctx.reply("❌ Time must be in HH:MM format (e.g., 09:00 or 23:00).");
  }
  if (!["daily", "weekly", "monthly"].includes(repeat)) {
    return ctx.reply("❌ Frequency must be daily, weekly, or monthly.");
  }
  if (repeat === "weekly" && days.length === 0) {
    return ctx.reply("❌ Weekly reminders require at least one day (e.g., Monday).");
  }

  await Reminder.create({
    chatId: ctx.chat.id,
    type: "medicine", // Crucial fix: Added type property
    medicine,
    times,
    repeat,
    days,
  });

  ctx.reply(
    `✅ Reminder saved!\n\n💊 ${medicine}\n⏰ ${times.join(", ")}\n🔁 ${repeat}`,
    { parse_mode: "Markdown" }
  );
}