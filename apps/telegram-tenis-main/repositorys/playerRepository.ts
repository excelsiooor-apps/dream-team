import { AppDataSource } from '../db/dataSource';
import { Rating } from '../entities/Rating';
import { Player } from './../entities/Player';

export class PlayerRepository {

  async Create(player:Player) {
    const connect = await AppDataSource;
    const newRatingTable = new Rating()
    player.rating = newRatingTable
    const repository = connect.getRepository(Player);
    const result = await repository.save(player);
    return result;
  }

  async Get(player: Player){
    const result = await AppDataSource    
    .getRepository(Player)
    .createQueryBuilder('player')
    .leftJoinAndSelect("player.rating", "rating")
    .where('player.id = :id', { id: player.id })
    .orWhere('player.TelegramId = :id', { id : player.id })
    .getOne();
    return result
  }

  async Update(player:Player) {
    const repository = AppDataSource.getRepository(Player);
    await repository.save(player)
  }

  async Delate(player:Player){
    const connect = await AppDataSource;
    const repository = connect.getRepository(Player);
    repository.delete(player);
  }
}


