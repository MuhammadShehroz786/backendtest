import mongoose from "mongoose";

const ReviewModel = new mongoose.Schema(
  {
    name: { type: String },
    review: { type: String },
    rate: { type: Number ,
    default: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
  }
);

export default mongoose.model("ReviewModel", ReviewModel);
