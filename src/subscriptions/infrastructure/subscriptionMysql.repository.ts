import connector from '../../common/persistence/mysql.persistence';
import { Subscription } from '../domain/subscription';
import { SubscriptionRepository } from '../repository/subscription.repository';

export class SubscriptionMySQLRepository implements SubscriptionRepository {
  public async all(): Promise<Subscription[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM wallet_subscription ORDER BY id DESC '
    );
    return rows as Subscription[];
  }

  public async find(id: number): Promise<Subscription | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM wallet_subscription WHERE id = ? ',
      [id]
    );
    if (!rows[0]) return null;
    return rows[0] as Subscription;
  }

  public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows]: any[] = await connector.execute(
      'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ? ',
      [user_id, code]
    );

    if (!rows[0]) return null;
    return rows[0] as Subscription;
  }

  public async save(entry: Subscription): Promise<void> {
    const dateNow = new Date();
    await connector.execute(
      'INSERT INTO wallet_subscription(user_id,code, amount, cron, created_at) VALUES(?,?,?,?,?)',
      [entry.user_id, entry.code, entry.amount, entry.cron, dateNow]
    );
  }

  /**
   * update
   */
  public async update(entry: Subscription): Promise<void> {
    const dateNow = new Date();
    await connector.execute(
      'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
      [entry.user_id, entry.code, entry.amount, entry.cron, dateNow, entry.id]
    );
  }

  /**
   * delete
   */
  public async delete(id: number): Promise<void> {
    await connector.execute(
      'DELETE FROM wallet_subscription WHERE id = ?',
      [id]
    );
  }
}