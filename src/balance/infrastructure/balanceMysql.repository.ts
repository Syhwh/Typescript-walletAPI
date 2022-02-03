import connector from '../../common/persistence/mysql.persistence';
import { Balance } from '../domain/balance';
import { BalanceRepository } from '../repository/balance.repository';

export class BalanceMySQLRepository implements BalanceRepository {
  public async all(): Promise<Balance[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM wallet_balance ORDER BY id DESC '
    );
    return rows as Balance[];
  }

  public async find(id: number): Promise<Balance | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM wallet_balance WHERE id = ? ',
      [id]
    );
    if (!rows[0]) return null;
    return rows[0] as Balance;
  }
  public async findByUserId(user_id: number): Promise<Balance | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM wallet_balance WHERE user_id = ? ',
      [user_id]
    );

    if (!rows[0]) return null;
    return rows[0] as Balance;
  }

  public async save(entry: Balance): Promise<void> {
    const dateNow = new Date();
    await connector.execute(
      'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?,?,?)',
      [entry.user_id, entry.amount, dateNow]
    );
  }

  public async update(entry: Balance): Promise<void> {
    const dateNow = new Date();
    await connector.execute(
      'UPDATE wallet_balance SET user_id = ?, amount = ?,  updated_at = ? WHERE id = ?',
      [entry.user_id, entry.amount, dateNow, entry.id]
    );
  }

  /**
   * delete
   */
  public async delete(id: number): Promise<void> {
    await connector.execute(
      'DELETE FROM wallet_balance WHERE id = ?',
      [id]
    );
  }
}