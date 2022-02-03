import { GET, POST, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../../common/controllers/base.controller";
import { TransactionCreateDTO } from "../dtos/transaction.dto";
import { TransactionService } from "../services/transaction.service";


@route('/transactions')
export class TransactionController extends BaseController {
  constructor(
    private readonly transactionService: TransactionService
  ) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response) {
    try {
      const transactions = await this.transactionService.all();
      const response = transactions.length > 0 ? transactions : [];
      res.status(200).json({
        status: 'success',
        data: response
      });
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await this.transactionService.find(id);
      if (response) {
        res.status(200).json({
          status: 'success',
          data: response
        });
      } else {
        res.status(404).json({
          status: 'error',
          data: 'not found'
        });
      }
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  public async save(req: Request, res: Response) {
    try {
      await this.transactionService.save({
        user_id: req.body.user_id,
        amount: req.body.amount,
        type: parseInt(req.body.type)
      } as TransactionCreateDTO);
      res.status(200).json({
        status: 'success'
      });
    } catch (error) {
      this.handleException(error, res);
    }
  }

}