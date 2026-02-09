import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    chatId: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["medicine", "vaccine"],
      default: "medicine",
    },

    /* =========================
       💊 MEDICINE FIELDS
       ========================= */
    medicine: {
      type: String,
      required: function () {
        return this.type === "medicine";
      },
    },

    times: {
      type: [String], // ["08:00", "14:00"]
      default: [],
    },

    repeat: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "daily",
    },

    days: {
      type: [String], // ["Monday", "Wednesday"]
      default: [],
    },

    /* =========================
       💉 VACCINE FIELDS
       ========================= */
    vaccine: {
      type: String,
      required: function () {
        return this.type === "vaccine";
      },
    },

    date: {
      type: String, // YYYY-MM-DD
      required: function () {
        return this.type === "vaccine";
      },
    },

    time: {
      type: String, // HH:mm
    },
  },
  { timestamps: true },
);

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
