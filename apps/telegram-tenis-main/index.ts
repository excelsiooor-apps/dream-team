import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
import { CommandStorage } from './commands/CommandHandlers';
import { CommandList, CommandDetails } from './types/Command';
import { ERROR } from './consts';

dotenv.config({ path: '.env' });

const token = process.env.DEV || 'Token-NOT-FOUND'

const bot = new TelegramBot(token, {polling:true})

bot.on('message', msg =>{
  usingCommand(msg)
})

bot.on('callback_query', (query) => {
  const msg = query.message;  
  const chatId = query?.message?.chat.id;
  const messageId = query.message?.message_id;
  console.log('button data', query.data)
  removeMessage(chatId,messageId)
  msg && usingCommand(msg)  
})

const removeMessage =(chatId:number|undefined,messageId:number|undefined)=>{
  if(chatId && messageId)
  bot.deleteMessage(chatId, messageId)
    .then(() => {
      console.log('Сообщение успешно удалено.');
    })
    .catch((error) => {
      console.error('Ошибка при удалении сообщения:', error);
    }); 
}
const usingCommand = (msg: TelegramBot.Message) => {
  const userId = msg?.chat.id
  const commandDetails = commandParser(msg)
  const commandHandler = commandDetails.command ? CommandStorage[commandDetails.command] : null;  
  commandHandler ? commandHandler.execute(bot,commandDetails) : bot.sendMessage(userId, ERROR.NotFoundCommand)
}
const commandParser = (msg: TelegramBot.Message) => {
  const command = msg.text?.startsWith('/') ? msg.text?.slice(1).split(' ')[0] as CommandList  :  null;
  const params = msg.text?.split(' ').slice(1) as string[];
  return {
    command,
    params
  } as CommandDetails
}
