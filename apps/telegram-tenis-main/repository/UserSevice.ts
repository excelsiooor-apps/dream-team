import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";
import { connectDatabase, disconnectDatabase } from "../connector";
import { User } from "../entities/User";
export class UserService {
  public async getUsers() {
    let connection;
  
    try {
      connection = await connectDatabase();
      const userRepository = connection.getRepository(User);
      const queryBuilder: SelectQueryBuilder<User> = userRepository.createQueryBuilder('user');
      queryBuilder.orderBy('user.defeats + user.victory', 'DESC');
      const users = await queryBuilder.getMany();
      const result = users.map(user => ({
        ...user,
        totalCount: user.calculateCountGame(),
        winningPercentage: user.calculateWinningPercentage(),
      }));      
      return result;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
  public async CreateUser(user: User) {
    let connection;
    console.log('USER',user)
    try {
      connection = await connectDatabase();
      
      const userRepository = connection.getRepository(User);
  
      const getUser = await userRepository.findOne({ where: { TelegramId: user.TelegramId } });
      if(!getUser){
        user.victory=0;
        user.defeats=0;
        const users = await userRepository.create(user);
        await userRepository.save(users);
        console.log('user created');
      }
      else{
        console.log('user exists');
      }
  
    } catch (error) {
      console.error('Error:', error);
    } finally {
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
  public async getUserButton(telegramId:number){
      console.log(telegramId)
      const list = (await this.getUsers())?.filter(user=>user.TelegramId !== telegramId);
      
      return (list?.map((user)=>{
        return [
          { text: `${user.username}`, callback_data: `/add ${user.id}` }
        ]
      }))
  }
  public async getUserById(userId:number){
    let connection;
  
    try {
      connection = await connectDatabase();
      const userRepository = connection.getRepository(User);
      const getUser = await userRepository.findOne({ where: { id: userId } });
      return getUser;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
    
  }
  public async getUserByTelegramId(TelegramUserId:number){
    let connection;
  
    try {
      connection = await connectDatabase();
      const userRepository = connection.getRepository(User);
      const getUser = await userRepository.findOne({ where: { TelegramId: TelegramUserId } });
      return getUser;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
    
  }
  public async UpdateUsers(Users: User[]){
    let connection;  
    try {
      connection = await connectDatabase();
      const userRepository = connection.getRepository(User);
      const updatePromises = Users.map(user => userRepository.update(user.id, { defeats: user.defeats, victory: user.victory }));
      const updateResults = await Promise.all(updatePromises);
      updateResults.forEach(result => {
        if (result.affected === 0) {
          console.error(`User update failed for user with id ${result.generatedMaps[0].id}`);
        }
      });  
      return updateResults;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
}