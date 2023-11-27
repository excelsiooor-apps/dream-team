
import TelegramBot from 'node-telegram-bot-api';
import { handleStartCommand, handleHelpCommand, handleDefaultCommand,  handleRegisteredSelectTypeCommand, handleRegisteredSelectEnemyCommand, handleRegisteredAddEnemyCommand,handleGetRatingCommand, handleGetMatchCommand, handleGGGameCommand, handleWinCommand, handleAddCommand, handleAdminCommand, handleRegisteredHandlingCommand, handleEndGameCommand, Test } from './Commands';
import { UserData } from '../types/UserData';
import { CommandData } from '../types/CommandData';

export type CommandHandler = (bot: TelegramBot, userData: UserData, commandData: CommandData) => void;
export enum Command {
  Start = 'start',
  Help = 'help',
  Register = 'register',
  OneVsOne = '1x1',
  Add = 'add',
  Yes = 'yes',
  No = 'no',
  Rating = 'rating',
  Match = 'match',
  EndGame = 'endGame',
  GG = "gg",
  Win = 'win',
  AddEn = 'adden',
  Admin = 'admin',
  Def = 'def',
  Test = 'test'
}
export const commandHandlers: Record<Command, CommandHandler> = {
  [Command.Start]: handleStartCommand,
  [Command.Help]: handleHelpCommand,
  [Command.Register]: handleRegisteredSelectTypeCommand,
  [Command.OneVsOne]: handleRegisteredSelectEnemyCommand,
  [Command.Add]: handleRegisteredAddEnemyCommand,
  [Command.Yes]: handleRegisteredHandlingCommand,
  [Command.No]: handleRegisteredHandlingCommand,
  [Command.Rating]: handleGetRatingCommand,
  [Command.Match]: handleGetMatchCommand,
  [Command.GG]: handleGGGameCommand,
  [Command.Win]: handleWinCommand,
  [Command.AddEn]: handleAddCommand,
  [Command.Admin]: handleAdminCommand,
  [Command.Def]: handleDefaultCommand,
  [Command.EndGame]: handleEndGameCommand,
  [Command.Test]: Test
};

