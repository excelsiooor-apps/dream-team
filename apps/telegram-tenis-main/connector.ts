import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import { Match } from './entities/Match';
import { MatchResult } from './entities/MatchResult';
import { Mode } from './entities/Mode';
import { Player } from './entities/Player';
import { Rating } from './entities/Rating';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });


export async function connectDatabase(): Promise<Connection> {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT) || 1234, 
    username: process.env.DB_USER, 
    password:  process.env.DB_PASS, 
    database:  process.env.DB_DB_NAME, 
    synchronize: true, // Устанавливаем synchronize в true для автоматической синхронизации схемы базы данных (только для разработки)
    logging: true, // Включаем логирование SQL запросов (можно отключить в продакшене)
    entities: [Match, MatchResult, Mode, Player, Rating],
  };

  try {
    const connection = await createConnection(connectionOptions);
    console.log('Connected to PostgreSQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
    throw error;
  }
}