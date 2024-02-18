import { PlayerService } from './../services/playerService';
import TelegramBot from "node-telegram-bot-api";
import { Command, CommandDetails } from "../types/Command";
import { UserDatails } from "../types/UserDetails";
import { Player } from '../entities/Player';

export class EditNameCommand implements Command {
  async execute(bot: TelegramBot, commandDetails: CommandDetails, userDatails: UserDatails): Promise<void> {
    const playerService = new PlayerService();
    let player = await playerService.GetByTelegramId(userDatails.telegramId, userDatails);
    if(!player){
      const newPlayer = new Player()
      newPlayer.TelegramId = userDatails.telegramId
      newPlayer.username = userDatails.userName
      player = await playerService.playerRepository.Create(newPlayer)
    }
    const newName = commandDetails.params[0];
    const oldName = player.username
    player.username = newName;
    await playerService.EditName(player);  
    bot.sendMessage(userDatails.telegramId, `Ваше имя было переименовано: ${oldName} ==> ${newName}`)

  }  
}