import { ObjectId } from "mongoose";
import Stats from "./Stats";
export default interface Tuit {
  _id: ObjectId;
  tuit: string;
  postedBy: ObjectId;
  postedOn?: Date;
  image?: String;
  youtube?: String;
  avatarLogo?: String;
  imageOverlay?: String;
  stats: Stats;
}
