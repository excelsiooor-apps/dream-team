import { Status } from './../entities/Status';
import { connectDatabase, disconnectDatabase } from "../connector";
import { Game } from "../entities/Game";
import { User } from "../entities/User";

export class GameService { 
  
  async createGameForTwoPlayers(player1Id: number, player2Id: number) {
    let connection;  
    try {
      connection = await connectDatabase();
      const userRepository = connection.getRepository(User);
      const gameRepository = connection.getRepository(Game);
      const statusRepository = connection.getRepository(Status);
      const player1 = await userRepository.findOne({ where: { id: player1Id } });
      const player2 = await userRepository.findOne({ where: { id: player2Id } });

      const listStatus = await statusRepository.find();
      const correctStatus = listStatus.find(x=>x.name==='Pending')
      if (!player1 || !player2) {
        throw new Error('Не удалось найти одного или обоих игроков.');
      }
      // Создаем новую игру
      const game = gameRepository.create({
        RegistrationId: player1.id,
        teamMembers: [player1, player2],
        status:correctStatus
      });

      return await gameRepository.save(game);
    }
    catch(e){
      console.log('Error Create Game =>',e)
    }
    finally{
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
  async CancelGame(gameId:number){
    let connection;  
    try {
      connection = await connectDatabase();
      const gameRepository = connection.getRepository(Game);
      if(gameId)
      await gameRepository.delete(gameId);
    }
    catch(e){
      console.error('Error Cancel Game =>',e)
    }
    finally{
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
  async AcceptGame(gameId:number){
    let connection;
    try {
      connection = await connectDatabase();
      const gameRepository = connection.getRepository(Game);
      const statusRepository = connection.getRepository(Status);
      const listStatus = await statusRepository.find();
      const correctStatus = listStatus.find(x=>x.name==='In battle')
      await gameRepository.update(gameId,{status: correctStatus});
    }
    catch(e){
      console.error('Error Accept Game =>',e)
    }
    finally{
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
  async getGamebyId(gameId:number){
    let connection;
    try {
      connection = await connectDatabase();
      const gameRepository = connection.getRepository(Game);      
      await gameRepository.findOne({where:{id:gameId}});

    }
    catch(e){
      console.error('getGamebyId => ', e)
    }
    finally{
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
  async getGamesByUserId(userId:number){
    let connection;
    try {
      connection = await connectDatabase();
      const gameRepository = connection.getRepository(Game);

      const result = await gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user', 'user')
      .leftJoinAndSelect('game.status', 'status')
      .select(['game.id', 'status.name', 'user.id'])
      .where({'user.id': userId})
      .getMany();
      console.log("DB", result)
      return result

    }
    catch(e){
      console.error('get Games By User Id => ', e)
    }
    finally{
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
  async EndGame(gameId:number){
    let connection;
    try {
      connection = await connectDatabase();
      const gameRepository = connection.getRepository(Game);
      const statusRepository = connection.getRepository(Status);
      const listStatus = await statusRepository.find();
      const correctStatus = listStatus.find(x=>x.name==='Completed')
      await gameRepository.update(gameId,{status: correctStatus});

    }
    catch(e){
      console.error('EndGame => ', e)
    }
    finally{
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
}