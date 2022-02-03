import { TransactionType } from '../enums/transactions.type';

export interface TransactionCreateDTO {
  user_id: number
  amount: number
  type: TransactionType
}

export interface TransactionUpdateDTO {
  id: number
}