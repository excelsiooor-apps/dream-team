import TelegramBot from "node-telegram-bot-api"
import { Command, CommandDetails } from "../types/Command"
import { UserDatails } from "../types/UserDetails"
import { MESSAGES } from "../utils/consts/Messages"
import { PlayerService } from "../services/playerService"


export class RatingCommand implements  Command {  
  async execute(bot: TelegramBot, commandDetails: CommandDetails, userDatails: UserDatails): Promise<void> {
    const playerService = new PlayerService();
    const player = await playerService.GetByTelegramId(userDatails.telegramId);
    const rating = player?.rating
    bot.sendMessage(userDatails.telegramId, MESSAGES.RatingMessage(rating))
  }
}