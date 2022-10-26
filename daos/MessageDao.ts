/**
 * @file Data access object RESTful Web service API for message resource
 */

import IMessageDao from "../interfaces/IMessageDao";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * This class represents the Message DAO for implementing the API endpoints for Message resource.
 */
export default class MessageDao implements IMessageDao {
  private static messageDao: MessageDao | null = null;

  /**
   * Creates singleton DAO instance
   * @return MessageDao
   */
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  };

  private constructor() {}

  /**
   * User can send a message to another user
   * @param message Message that needs to be sends
   */
  userSendsMessage = async (message: Message): Promise<Message> =>
    MessageModel.create({ ...message });

  /**
   * User can delete a message that is sent to another user
   * @param mid Message that needs to be deleted
   */
  userDeletesMessage = async (mid: string): Promise<any> =>
    MessageModel.deleteOne({ _id: mid });

  /**
   * Retrieves all messages that are sent by user from the database
   * @param uid representing the user for which messages are to be retrieved
   */
  getAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ from: uid });

  /**
   * Retrieves all messages that are sent to user from the database
   * @param uid representing the user for which messages are to be retrieved
   */
  getAllMessagesSentToUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ to: uid });
}
