import { UserDatails } from './types/UserDetails';
import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
import { CommandList, CommandDetails, CommandStorage } from './types/Command';
import { ERROR } from './utils/consts/Error';

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
  const buttonData = query.data || 'not';
  removeMessage(chatId,messageId)
  msg && usingCommand(msg,buttonData)
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
const usingCommand = (msg: TelegramBot.Message, buttonCallback?: string ) => {
  const command = buttonCallback ? buttonCallback : msg.text || 'not command'
  const userId = msg?.chat.id

  const commandDetails = commandParser(command)
  const commandHandler = commandDetails.command ? CommandStorage[commandDetails.command] : null;
  
  const userDatails = new UserDatails(userId, msg.chat.first_name || 'No Name')

  commandHandler ? commandHandler.execute(bot,commandDetails,userDatails) : bot.sendMessage(userId, ERROR.NotFoundCommand(command))
}
const commandParser = (msg: string) => {
  const command = msg?.startsWith('/') ? msg?.slice(1).split(' ')[0] as CommandList  :  null;
  const params = msg?.split(' ').slice(1) as string[];
  return {
    command,
    params
  } as CommandDetails
}
