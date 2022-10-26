import { model } from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

/**
 * @file Creates a BookmarkModel which is used to perform db operations on the bookmarks collection
 */

const BookmarkModel = model("BookmarkModel", BookmarkSchema);

export default BookmarkModel;
