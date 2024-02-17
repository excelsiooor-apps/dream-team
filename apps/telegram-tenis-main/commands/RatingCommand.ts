import TelegramBot from "node-telegram-bot-api"
import { Command, CommandDetails } from "../types/Command"
import { UserDatails } from "../types/UserDetails"
import { MESSAGES } from "../utils/consts/Messages"

export class RatingCommand implements  Command {  
  execute(bot: TelegramBot, commandDetails: CommandDetails, userDatails: UserDatails): void {
    bot.sendMessage(userDatails.userId, MESSAGES.RatingMessage())
  }
}