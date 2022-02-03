import { Balance } from "../../balance/domain/balance";
import { BalanceRepository } from "../../balance/repository/balance.repository";
import { ApplicationException } from "../../common/exceptions/application.exception";
import { Transaction } from "../domain/transaction";
import { TransactionCreateDTO } from "../dtos/transaction.dto";
import { TransactionType } from "../enums/transactions.type";
import { TransactionRepository } from "../repository/transaction.repository";

export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly balanceRepository: BalanceRepository
  ) { }

  public async all(): Promise<Transaction[]> {
    return await this.transactionRepository.all();
  }

  public async find(id: number): Promise<Transaction | null> {
    return await this.transactionRepository.find(id);
  }

  public async save(entry: TransactionCreateDTO): Promise<void> {
    const balance = await this.balanceRepository.findByUserId(entry.user_id);
    switch (entry.type) {
      case TransactionType.deposit:
        await this.deposit(entry, balance);
        break;
      case TransactionType.withdrawal:
        await this.withdrawal(entry, balance);
        break;
      default:
        throw new ApplicationException('invalid movement supply');
    }
  }

  private async deposit(entry: TransactionCreateDTO, balance: Balance | null): Promise<void> {
    if (!balance) {
      await this.balanceRepository.save({
        amount: entry.amount,
        user_id: entry.user_id
      } as Balance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepository.update(balance);
    }
    await this.transactionRepository.save(entry as Transaction);
  }

  private async withdrawal(entry: TransactionCreateDTO, balance: Balance | null) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('Not enough balance');
    } else {
      balance.amount += entry.amount;
      await this.balanceRepository.update(balance);
      await this.transactionRepository.update(entry as Transaction);
    }
  }
}