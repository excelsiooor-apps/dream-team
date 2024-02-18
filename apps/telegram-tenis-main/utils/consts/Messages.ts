import { Player } from "../../entities/Player";
import { Rating } from "../../entities/Rating";
import { keyboardHelp, keywordListPlayers } from "../../keyboards/keyboard";

export const MESSAGES = {
  StartMessage: ( name: string ) => `З поверненням ${name  || 'no name'}, в телеграм бот для вдосконалення гри у насольний теніс та введення статистики.`,
  StartFerstMessage: ( name: string ) => `Мої привітання вас будо зарегистрировано як ${name  || 'no name'}, успіхів у майбутніх іграх.`,
  RatingMessage: ( value: Rating ) => {
    let result = 'Ваші показники:\n';
    if(value){
      result += `Всього ігор: ${value.totalMatches}\n`
      result += `Перемог: ${value.victory}\n`
      result += `Поразок: ${value.defeat}\n`
      result += `Рейтинг: ${value.score}\n`
      result += `Всього голів: ${value.totalGoals}\n`
      result += `Всього забитих голів: ${value.winGoals}\n`
      result += `Всього схибито голів: ${value.defeatGoals}\n`
    }
    return result;
  },
  Help:(commandList: string[]) => `${commandList.map(item => `${item} \n`)}`,
  RegistrationMatche: 'Кого на цей раз викликати на бій:',
  KEYBOARD: {
    START : {
      reply_markup: keyboardHelp
    },
    LIST_PLAYER: (players : Player[]) =>{return {reply_markup: keywordListPlayers(players)}}
  }
}