import TelegramBot from "node-telegram-bot-api";
import { Command, CommandDetails, CommandList } from "../types/Command";
import { UserDatails } from "../types/UserDetails";
import { MESSAGES } from "../utils/consts/Messages";

export class HelpCommane implements Command {
  execute(bot: TelegramBot, commandDetails: CommandDetails, userDatails: UserDatails): void {
    const commandList: string[] = []
    const valueEnum = Object.values(CommandList)
    valueEnum.map(command=> commandList.push(`/${command}`) )
    
    bot.sendMessage(userDatails.telegramId, MESSAGES.Help(commandList))
  }  
}