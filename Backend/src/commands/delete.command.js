import Reminder from "../models/reminder.model.js";

export default async function deleteCommand(ctx, next) {
  if (!ctx.message?.text.startsWith("/delete")) return next();
  const parts = ctx.message.text.split(" ");
  if (parts.length < 2) {
    return ctx.reply("❌ Invalid format. Use /delete <medicine_name>");
  }
  const medicineToDelete = parts.slice(1).join(" ");
  const medicines = await Reminder.find({ chatId: ctx.chat.id }).select(
    "medicine",
  );

  const isMedicineExists = medicines.some(
    (reminder) => reminder.medicine === medicineToDelete.toLowerCase(),
  );
  if (!isMedicineExists) {
    return ctx.reply(`❌ Medicine "${medicineToDelete}" not found.`);
  }

  const success = await Reminder.deleteOne({
    chatId: ctx.chat.id,
    medicine: medicineToDelete.toLowerCase(),
  });
  if (!success.deletedCount) {
    return ctx.reply(`❌ Failed to delete medicine "${medicineToDelete}". Please try again.`);
  }
  ctx.reply(`✅ Medicine "${medicineToDelete}" deleted successfully.`);
  const updatedMedicines = await Reminder.find({ chatId: ctx.chat.id }).select(
    "medicine times repeat days",
  );
  if (updatedMedicines.length === 0) {
    ctx.reply("You have no medicine reminders set.");
  } else {
    const reminderList = updatedMedicines.map((m) => {
        const days = m.days.length > 0 ? `📅 ${m.days.join(", ")}` : "";
        return `💊 *${m.medicine}*\n⏰ Time: ${m.times}\n🔄 Repeat: ${m.repeat}\n${days}`;
      })
      .join("\n\n");
    ctx.reply(`📋 *Your Reminders*\n\n${reminderList}`, {
      parse_mode: "Markdown",
    });
  }
}
