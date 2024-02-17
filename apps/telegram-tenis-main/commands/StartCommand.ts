import TelegramBot from "node-telegram-bot-api";
import { Command, CommandDetails } from "../types/Command";

export class StartCommand implements  Command {  
  execute(bot: TelegramBot, commandDetails: CommandDetails): void {
    console.log('params', {
      bot,
      commandDetails
    })
    console.log('command', commandDetails.command[0])
  }
}