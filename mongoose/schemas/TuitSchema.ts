import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
  tuit: { type: String, required: true },
  postedOn: { type: Date, required: true, default: Date.now },
  postedBy: { type: String, required: true },
});

export default TuitSchema;
