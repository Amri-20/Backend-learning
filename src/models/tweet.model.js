import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
  {
    sontent: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Tweets = mongoose.model("Tweet", tweetSchema);
