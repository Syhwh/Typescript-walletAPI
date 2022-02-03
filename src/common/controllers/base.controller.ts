import { Response } from "express";
import { ApplicationException } from "../exceptions/application.exception";


export abstract class BaseController {
  handleException(err: any, res: Response) {
    if (err instanceof ApplicationException) {
      res.status(400).json({
        error: {
          code: 400,
          message: err.message ? err.message : 'Bad request'
        }
      });
    }
  }
}