import TelegramBot from "node-telegram-bot-api";
import { Command, CommandDetails } from "../types/Command";
import { UserDatails } from '../types/UserDetails';
import { keyboardHelp } from "../keyboards/keyboard";
import { MESSAGES } from "../utils/consts/Messages";

export class StartCommand implements  Command {  
  execute(bot: TelegramBot, commandDetails: CommandDetails, userDatails: UserDatails): void {
    bot.sendMessage(userDatails.userId, MESSAGES.HelloMessage(userDatails.userName))
    bot.sendMessage(userDatails.userId, 'Действия:', {
      reply_markup: keyboardHelp
    })
  }
}