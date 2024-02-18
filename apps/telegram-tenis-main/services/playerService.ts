import { UserDatails } from './../types/UserDetails';
import { Player } from '../entities/Player';
import { PlayerRepository } from './../repositorys/playerRepository';
export class PlayerService {
  playerRepository = new PlayerRepository()

  async GetByTelegramId(id: number, userDatails?: UserDatails){
    const player = new Player()
    if(userDatails){
      player.TelegramId = userDatails.telegramId
      player.username = userDatails.userName
      return this.playerRepository.Create(player)
    }    
    player.id = id
    return await this.playerRepository.Get(player)
  }
  async EditName(player: Player){    
    return await this.playerRepository.Update(player);
  }
}