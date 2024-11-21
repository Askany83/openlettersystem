import mongoose, { Schema, models } from "mongoose";

const letterReceiverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LetterReceiver =
  models.LetterReceiver ||
  mongoose.model("LetterReceiver", letterReceiverSchema);

export default LetterReceiver;
