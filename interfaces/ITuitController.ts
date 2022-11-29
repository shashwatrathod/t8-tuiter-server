import { Request, Response } from "express";

/**
 * The interface contains the method signatures that need to be implemented by the Controller for Tuit resource
 */
export default interface ITuitController {
    findAllTuits (req: Request, res: Response): void;
    findAllTuitsByUser (req: Request, res: Response): void;
    findTuitById (req: Request, res: Response): void;
    createTuitByUser (req: Request, res: Response): void;
    updateTuit (req: Request, res: Response): void;
    deleteTuit (req: Request, res: Response): void;
    getVersions (req: Request, res: Response): void;
};
