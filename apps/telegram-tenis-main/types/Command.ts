
import { EditNameCommand } from '../commands/EditNameCommand';
import { HelpCommane } from '../commands/HelpCommand';
import { RatingCommand } from '../commands/RatingCommand';
import { RegistrationMatcheCommand } from '../commands/RegistrationMatcheCommand';
import { StartCommand } from '../commands/StartCommand';
import { UserDatails } from './UserDetails';
import TelegramBot from "node-telegram-bot-api";


export interface Command {
  execute(bot: TelegramBot, commandDetails: CommandDetails, userDatails: UserDatails): void;
}
export interface CommandDetails {
  command: CommandList,
  params: string[]
}
export enum CommandList {
  Start = 'start',
  Rating = 'rating',
  EditName = 'editname',
  Help = 'help',
  Register = 'register',
  // OneVsOne = '1x1',
  // Buttle = 'buttle',
  // Yes = 'yes',
  // No = 'no',
  // Match = 'match',
  // EndGame = 'endGame',
  // GG = "gg",
  // Win = 'win',
  // AddEn = 'adden',
  // Admin = 'admin',
  // Def = 'def',
  // Test = 'test'
}
export const CommandStorage: Record<CommandList, Command> = {
  [CommandList.Start]: new StartCommand(),
  [CommandList.Rating]: new RatingCommand(),
  [CommandList.EditName]: new EditNameCommand(),
  [CommandList.Help]: new HelpCommane(),
  [CommandList.Register]: new RegistrationMatcheCommand()
};
