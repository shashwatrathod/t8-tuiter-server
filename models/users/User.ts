import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import { ObjectId } from "mongoose";

/**
 * @typedef User Represents a user in our tuiter app
 * @property {string} username name of user
 * @property {string} password password for the account
 * @property {string} firstName first name of user
 * @property {string} lastName last name of user
 * @property {string} email email id of user
 * @property {string} profilePhoto profile picture of user
 * @property {string} headerImage header image for user home page
 * @property {string} biography bio of user
 * @property {Date}   dateOfBirth date of birh of user
 * @property {AccountType} accountType the type of account
 * @property {MaritalStatus} maritalStatus marital status of the user
 * @property {number} salary salary of the user
 */
export default interface User {
    _id?: ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};