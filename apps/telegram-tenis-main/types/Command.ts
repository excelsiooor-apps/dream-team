import TelegramBot from "node-telegram-bot-api";
import { StartCommand } from "../commands/StartCommand";


export interface Command {
  execute(bot: TelegramBot, commandDetails: CommandDetails): void;
}
export interface CommandDetails {
  command: CommandList,
  params: string[]
}
export enum CommandList {
  Start = 'start',
  // Help = 'help',
  // Register = 'register',
  // OneVsOne = '1x1',
  // Add = 'add',
  // Yes = 'yes',
  // No = 'no',
  // Rating = 'rating',
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
};
