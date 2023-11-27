import TelegramBot from 'node-telegram-bot-api';
import { Command, commandHandlers } from "./command/HandlerCommand";
import { UserData } from './types/UserData';
import { CommandData } from './types/CommandData';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const token = process.env.TOKEN || 'Token-NOT-FOUND'

const bot = new TelegramBot(token, {polling:true})

bot.on('message', msg =>{
  const textMessage = msg.text
  hendlerCommand(textMessage, msg);
})

bot.on('callback_query', (query) => {
  const msg = query.message;  
  const chatId = query?.message?.chat.id;
  const messageId = query.message?.message_id;
  
  removeMessage(chatId,messageId)
  const buttonData = query.data;
  hendlerCommand(buttonData,msg)
  
});

const parserCommand = (msg:string) : CommandData | null => {
  if (msg?.startsWith('/')) {
    const match = msg.match(/^\/(\w+)(?:\s+([\s\S]*))?$/);
    if(match)
    return {
      command:match?.[1],
      params:match?.[2]?.split(/\s+/) 
    }
    else{
      return null
    }
  }else{
    return null
  }
}
const initUserData = (msg:TelegramBot.Message|undefined)=>{
  return {
    userId:  msg?.chat.id ||0,
    messageText: msg?.text ||'',
    userFirstName: msg?.chat.first_name||"userName NotFound"
  }
}
const hendlerCommand = (text:string|undefined , message: TelegramBot.Message|undefined) => {
  if(text && message){
    const UserData : UserData = initUserData(message);
    const CommandData : CommandData | null = parserCommand(text)
    if(CommandData){
      const {command} = CommandData
      const hendler = commandHandlers[command as Command]
      hendler?hendler(bot,UserData,CommandData):commandHandlers['def'](bot,UserData,CommandData)
    }
    else{
      bot.sendMessage(UserData.userId, 'Ответочка')
    }
  }
}
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

