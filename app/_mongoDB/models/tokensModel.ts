import mongoose, { Schema } from "mongoose";

const tokensSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  refreshToken: {
    token: {
      type: String,
      required: true,
    },
    userCount: {
      type: Number,
      required: true,
    },
  },
  oldTokens: {
    type: [String],
    validate: {
      validator: (arr: string[]) => arr.length <= 30,
      message: "oldTokens array exceeds the maximum length of 30",
    },
  },
});

export default mongoose.models.Token || mongoose.model("Token", tokensSchema);
