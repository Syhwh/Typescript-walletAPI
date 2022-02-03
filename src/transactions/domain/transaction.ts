import { TransactionType } from "../enums/transactions.type";

export interface Transaction {
  id: number,
  user_id: number,
  type: TransactionType,
  amount: number,
  created_at: Date | null,
  updated_at: Date | null
}