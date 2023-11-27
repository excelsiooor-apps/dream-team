import TelegramBot from 'node-telegram-bot-api';
import { Command, commandHandlers } from "./command/HandlerCommand";
import { UserData } from './types/UserData';
import { CommandData } from './types/CommandData';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const token = process.env.TOKEN || 'Token-NOT-FOUND'

const bot = new TelegramBot(token, {polling:true})

bot.on('message', msg =>{
  const UserData : UserData = initUserData(msg);

  const CommandData : CommandData | [] = parserCommand(UserData.messageText)
  if(!Array.isArray(CommandData)){
    const {command} = CommandData
    const hendler = commandHandlers[command as Command]
    hendler?hendler(bot,UserData,CommandData):commandHandlers['def'](bot,UserData,CommandData)
  }
  else{
    bot.sendMessage(UserData.userId, 'Ответочка')
  }
})
bot.on('callback_query', (query) => {
  const msg = query.message;
  const UserData : UserData = initUserData(msg);
  const chatId = query?.message?.chat.id;
  const messageId = query.message?.message_id;
  if(chatId && messageId)
  // Удаление сообщения после нажатия на кнопку
  bot.deleteMessage(chatId, messageId)
    .then(() => {
      console.log('Сообщение успешно удалено.');
    })
    .catch((error) => {
      console.error('Ошибка при удалении сообщения:', error);
    });
  
  const buttonData = query.data;
  console.log(`Debug  msg ${msg}  |  buttonDATA ${buttonData}`)
  if(buttonData){
    const CommandData : CommandData | [] = parserCommand(buttonData)
    console.log("Command", CommandData);
    if(!Array.isArray(CommandData)){
      const {command} = CommandData
      const hendler = commandHandlers[command as Command]
      hendler?hendler(bot,UserData,CommandData):commandHandlers['def'](bot,UserData,CommandData)
    }
    else{
      bot.sendMessage(UserData.userId, 'Ответочка после кнопки')
    }
  }
});

const parserCommand = (msg:string) : CommandData | [] => {
  if (msg?.startsWith('/')) {
    const match = msg.match(/^\/(\w+)(?:\s+([\s\S]*))?$/);
    if(match)
    return {
      command:match?.[1],
      params:match?.[2]?.split(/\s+/) 
    }
    else{
      return []
    }
  }else{
    return []
  }
}
const initUserData = (msg:TelegramBot.Message|undefined)=>{
  return {
    userId:  msg?.chat.id ||0,
    messageText: msg?.text ||'',
    userFirstName: msg?.chat.first_name||"userName NotFound"
  }
}

