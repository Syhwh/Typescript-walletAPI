import { DELETE, GET, POST, PUT, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../../common/controllers/base.controller";
import { SubscriptionCreateDTO, SubscriptionUpdateDTO } from "../dtos/subscription.dto";
import { SubscriptionService } from "../services/subscription.service";


@route('/subscriptions')
export class SubscriptionController extends BaseController {
  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response) {
    try {
      console.log('controller ok');
      const subscriptions = await this.subscriptionService.all();
      const response = subscriptions.length > 0 ? subscriptions : 'no subs';
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
      const response = await this.subscriptionService.find(id);
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
      await this.subscriptionService.save({
        user_id: req.body.user_id,
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron
      } as SubscriptionCreateDTO);
      res.status(200).json({
        status: 'success'
      });
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.subscriptionService.update(id, {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron
      } as SubscriptionUpdateDTO);

      res.status(200).json({
        status: 'success'
      });
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.subscriptionService.remove(id);

      res.status(200).json({
        status: 'success'
      });
    } catch (error) {
      this.handleException(error, res);
    }
  }
}