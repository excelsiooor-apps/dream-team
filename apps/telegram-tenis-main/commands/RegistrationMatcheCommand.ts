import TelegramBot from "node-telegram-bot-api";
import { Command, CommandDetails } from "../types/Command";
import { UserDatails } from "../types/UserDetails";
import { PlayerService } from "../services/playerService";
import { MESSAGES } from "../utils/consts/Messages";


export class RegistrationMatcheCommand implements Command {
  async execute(bot: TelegramBot, commandDetails: CommandDetails, userDatails: UserDatails): Promise<void> {
    console.log('params', {
      bot,
      commandDetails,
      userDatails
    })
    const playerService = new PlayerService()
    const players = await (await playerService.playerRepository.GetAll())
    //.filter(player => player.TelegramId !== userDatails.telegramId) // prod mode

    bot.sendMessage(userDatails.telegramId, MESSAGES.RegistrationMatche, MESSAGES.KEYBOARD.LIST_PLAYER(players))

  }  
}