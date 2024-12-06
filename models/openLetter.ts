import mongoose, { Schema, models } from "mongoose";

const openLetterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    message: {
      type: String,
      required: true,
    },
    letterSender: {
      type: Schema.Types.ObjectId,
      ref: "LetterSender",
      required: true,
    },
    letterReceiver: {
      type: Schema.Types.ObjectId,
      ref: "LetterReceiver",
      required: true,
    },
  },
  { timestamps: true }
);

const OpenLetter =
  models.OpenLetter || mongoose.model("OpenLetter", openLetterSchema);

export default OpenLetter;
