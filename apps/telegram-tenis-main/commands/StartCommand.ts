import TelegramBot from "node-telegram-bot-api";
import { Command, CommandDetails } from "../types/Command";
import { UserDatails } from '../types/UserDetails';
import { MESSAGES } from "../utils/consts/Messages";
import { PlayerService } from "../services/playerService";
import { Player } from "../entities/Player";


export class StartCommand implements  Command {  
  async execute(bot: TelegramBot, commandDetails: CommandDetails, userDatails: UserDatails): Promise<void> {
    const playerService = new PlayerService();
    const player = await playerService.GetByTelegramId(userDatails.telegramId);
    if(player){
      bot.sendMessage(userDatails.telegramId, MESSAGES.StartMessage(player.username || 'no name'), MESSAGES.KEYBOARD.START)
    }
    else{
      const player = new Player();
      player.TelegramId = userDatails.telegramId;
      player.username = userDatails.userName;      
      const result = await playerService.playerRepository.Create(player)
      bot.sendMessage(result.TelegramId, MESSAGES.StartFerstMessage(result.username || 'no name'), MESSAGES.KEYBOARD.START)
    }    
  }
}