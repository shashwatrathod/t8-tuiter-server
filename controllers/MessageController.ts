/**
 * @file Controller RESTful Web service API for messages resource
 */
import { Request, Response, Express } from "express";
import IMessageController from "../interfaces/IMessageController";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages/sent to retrieve all the messages sent by user
 *     </li>
 *     <li>GET /api/users/:uid/messages/received to retrieve all messages recieved by user
 *     </li>
 *     <li>POST /api/messages to record that a user sends a message to another user
 *     </li>
 *     <li>DELETE /api/messages/:mid delete a message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements IMessageController {
  private static messageDao: MessageDao = MessageDao.getInstance();
  private static messageController: MessageController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return MessageController
   */
  public static getInstance = (app: Express): MessageController => {
    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController();
      app.get(
        "/api/users/:uid/messages/sent",
        MessageController.messageController.getAllMessagesSentByUser
      );
      app.get(
        "/api/users/:uid/messages/received",
        MessageController.messageController.getAllMessagesSentToUser
      );
      app.post(
        "/api/messages",
        MessageController.messageController.userSendsMessage
      );
      app.delete(
        "/api/messages/:mid",
        MessageController.messageController.userDeletesMessage
      );
    }
    return MessageController.messageController;
  };

  private constructor() {}

  /**
   * @param {Request} req Represents request from client, including the
   * body representing the user that is sending the message, user that is recieving the message
   * and the message itself
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new message that was inserted in the
   * database
   */
  userSendsMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .userSendsMessage(req.body)
      .then((message) => res.json(message));

  /**
   * Delete a message
   * @param {Request} req Represents request from client, including the
   * path parameters mid representing the message that needsto be deleted
   * @param {Response} res Represents response to client, including status
   * on whether deleting the message was successful or not
   */
  userDeletesMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .userDeletesMessage(req.params.mid)
      .then((status) => res.json(status));

  /**
   * Retrieves all messages that that are sent by user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user for which messages are to be retrieved
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  getAllMessagesSentByUser = (req: Request, res: Response) =>
    MessageController.messageDao
      .getAllMessagesSentByUser(req.params.uid)
      .then((messages) => res.json(messages));

  /**
   * Retrieves all messages that that are sent to user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user for which messages are to be retrieved
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  getAllMessagesSentToUser = (req: Request, res: Response) =>
    MessageController.messageDao
      .getAllMessagesSentToUser(req.params.uid)
      .then((messages) => res.json(messages));
}
