import { ApplicationException } from "../../common/exceptions/application.exception";
import { SubscriptionCreateDTO, SubscriptionUpdateDTO } from "../dtos/subscription.dto";
import { Subscription } from "../domain/subscription";
import { SubscriptionRepository } from "../repository/subscription.repository";

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository
  ) { }


  public async all(): Promise<Subscription[]> {
    return await this.subscriptionRepository.all();
  }

  public async find(id: number): Promise<Subscription | null> {
    return await this.subscriptionRepository.find(id);
  }

  public async store(entry: SubscriptionCreateDTO): Promise<void> {
    const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code);
    if (!originalEntry) {
      await this.subscriptionRepository.store(entry as Subscription);
    } else {
      throw new ApplicationException(' User subscription already exists');
    }

  }

  public async update(id: number, entry: SubscriptionUpdateDTO): Promise<void> {
    const originalEntry = await this.subscriptionRepository.find(id);
    if (originalEntry) {
      originalEntry.code = entry.code;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;
      await this.subscriptionRepository.update(originalEntry);
    } else {
      throw new ApplicationException('Subscription doesn\'t exists');
    }
  }

  public async remove(id: number): Promise<void> {
    return this.subscriptionRepository.delete(id);
  }
}