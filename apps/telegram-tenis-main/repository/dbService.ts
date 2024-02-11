import { connectDatabase, disconnectDatabase } from '../connector';

export class DBService{
  public static async withDatabase<T>(callback: () => Promise<T>): Promise<T | null> {
    let connection;
    try {
      connection = await connectDatabase();
      return await callback();
    } catch (error) {
      console.error('Database operation error:', error);
      return null;
    } finally {
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
}


