import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    chatId: { type: Number, required: true },
    type: {
      type: String,
      enum: ["medicine", "vaccine"],
      default: "medicine",
    },
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
    vaccine: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: String, // HH:mm
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
