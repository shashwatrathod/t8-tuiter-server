import { ObjectId } from "mongoose";
import Stats from "./Stats";

/**
 * @typedef Tuit represents a single tuit, which is a piece of text with optional images/links.
 * 
 * @property {string} tuit the text of this tuit
 * @property {ObjectId} postedBy the author({@link User}) of this tuit
 * @property {Date} postedOn the date on which this tuit was created
 * @property {string} image URL of any image associated with this tuit
 * @property {string} youtube URL of the YT video associated with this tuit
 * @property {string} avatarLogo URL of the avatar logo for this tuit
 */
export default interface Tuit {
  _id: ObjectId;
  tuit: string;
  postedBy: ObjectId;
  postedOn?: Date;
  image?: String;
  youtube?: String;
  avatarLogo?: String;
  stats: Stats;
}
