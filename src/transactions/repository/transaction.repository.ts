import { Transaction } from "../domain/transaction";

export interface TransactionRepository {
  all(): Promise<Transaction[]>
  find(id: number): Promise<Transaction | null>
  save(entry: Transaction): Promise<void>
  update(entry: Transaction): Promise<void>
  delete(id: number): Promise<void>
}