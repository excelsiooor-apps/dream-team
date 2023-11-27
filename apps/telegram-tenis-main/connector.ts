import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { User } from './entities/User';
import { Game } from './entities/Game';
import { Status } from './entities/Status';

export async function connectDatabase(): Promise<Connection> {
  const connectionOptions: ConnectionOptions = {
    type: 'sqlite',
    database: './db/database.sqlite',
    synchronize: true,
    logging: true,
    entities: [User,Game,Status],
  };

  const connection = await createConnection(connectionOptions);
  console.log('Connected to the database');
  return connection;
}

export async function disconnectDatabase(connection: Connection): Promise<void> {
  await connection.close();
  console.log('Disconnected from the database');
}