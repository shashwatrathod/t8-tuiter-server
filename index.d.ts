import { Session as ExpressSession } from "express-session";

export interface Session extends ExpressSession {
  profile?: any;
}
