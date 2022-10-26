import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface IMessageDao {
  userSendsMessage(message: Message): Promise<Message>;
  userDeletesMessage(mid: string): Promise<any>;
  getAllMessagesSentByUser(uid: string): Promise<Message[]>;
  getAllMessagesSentToUser(uid: string): Promise<Message[]>;
}
