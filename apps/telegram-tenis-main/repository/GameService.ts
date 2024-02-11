/* eslint-disable @typescript-eslint/no-unused-vars */
import { DBService } from './dbService';
import { Repository } from 'typeorm/repository/Repository';
import { UpdateResult, getRepository } from 'typeorm';
import { Game } from 'node-telegram-bot-api';

export class GameService {

  constructor() {

  }
  
  // async createGameForTwoPlayers(player1Id: number):Promise<Game|null> {
  //   // return DBService.withDatabase<Game|null>(async () =>{
  //   //     const player1 = await this.userRepository.findOne({ where: { id: player1Id } });
  //   //     const player2 = await this.userRepository.findOne({ where: { id: player2Id } });
  //   //     const correctStatus = await this.statusRepository.findOne({ where: { name: 'Pending' }})
  //   //     if (!player1 || !player2) {
  //   //       console.error('Не удалось найти одного или обоих игроков.')
  //   //       return null;
  //   //     }
  //   //     const game = await this.gameRepository.create({
  //   //       RegistrationId: player1.id,
  //   //       teamMembers: [player1, player2],
  //   //       status: correctStatus,
  //   //     } as Game);

  //   //     const savedGame = await this.gameRepository.save(game);
  //   //     console.log('Game created:', savedGame);
  //   //     return savedGame;
  //   //   });
  //   }
  // async CancelGame(gameId:number){
  //   return DBService.withDatabase<void>(async()=>{
  //     if(gameId)
  //     await this.gameRepository.delete(gameId);      
  //   })
  // }
  // async AcceptGame(gameId:number){
  //   return DBService.withDatabase<UpdateResult>( async ()=>{
  //     const listStatus = await this.statusRepository.find();
  //     const correctStatus = listStatus.find(x=>x.name==='In battle')
  //     return await this.gameRepository.update(gameId,{status: correctStatus});
  //   })
  // }
  // async getGamebyId(gameId:number){
  //   return DBService.withDatabase<Game|null>(async ()=>{
  //     return await this.gameRepository.findOne({where:{id:gameId}});
  //   })
  // }
  // async getGamesByUserId(userId:number){
  //   console.log(userId);
  //   throw Error("not emplemented")
  // }
  // async EndGame(gameId:number){
  //   return DBService.withDatabase<UpdateResult>(async()=>{
  //     const listStatus = await this.statusRepository.find();
  //     const correctStatus = listStatus.find(x=>x.name==='Completed')
  //     return await this.gameRepository.update(gameId,{status: correctStatus});
  //   })
  // }
}