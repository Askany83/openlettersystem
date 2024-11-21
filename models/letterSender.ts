import mongoose, { Schema, models } from "mongoose";

const letterSenderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LetterSender =
  models.LetterSender || mongoose.model("LetterSender", letterSenderSchema);

export default LetterSender;
