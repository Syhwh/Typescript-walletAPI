import connector from '../../common/persistence/mysql.persistence';
import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../repository/transaction.repository';

export class TransactionsMySQLRepository implements TransactionRepository {
  public async all(): Promise<Transaction[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM wallet_transactions ORDER BY id DESC '
    );
    return rows as Transaction[];
  }

  public async find(id: number): Promise<Transaction | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM wallet_transactions WHERE id = ? ',
      [id]
    );
    if (!rows[0]) return null;
    return rows[0] as Transaction;
  }

  public async findByUserAndCode(user_id: number, code: string): Promise<Transaction | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM wallet_transactions WHERE user_id = ? AND code = ? ',
      [user_id, code]
    );

    if (!rows[0]) return null;
    return rows[0] as Transaction;
  }

  public async save(entry: Transaction): Promise<void> {
    const dateNow = new Date();
    await connector.execute(
      'INSERT INTO wallet_transactions(user_id, type, amount, created_at) VALUES(?,?,?,?)',
      [entry.user_id, entry.type, entry.amount, dateNow]
    );
  }

  public async update(entry: Transaction): Promise<void> {
    const dateNow = new Date();
    await connector.execute(
      'UPDATE wallet_transactions SET user_id = ?, type = ?, amount = ?,  updated_at = ? WHERE id = ?',
      [entry.user_id, entry.type, entry.amount, dateNow, entry.id]
    );
  }

  /**
   * delete
   */
  public async delete(id: number): Promise<void> {
    await connector.execute(
      'DELETE FROM wallet_transactions WHERE id = ?',
      [id]
    );
  }
}