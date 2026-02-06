import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    chatId: { type: Number, required: true },
    medicine: { type: String, required: true },

    times: [String],
    // ["08:00", "14:00", "21:00"]

    repeat: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },

    days: [String],
    // ["Monday", "Wednesday"] (for weekly)
  },
  { timestamps: true },
);

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;