import { Balance } from "../domain/balance";

export interface BalanceRepository {
  all(): Promise<Balance[]>
  find(id: number): Promise<Balance | null>
  findByUserId(user_id: number): Promise<Balance | null>
  save(entry: Balance): Promise<void>
  update(entry: Balance): Promise<void>
  delete(id: number): Promise<void>
}