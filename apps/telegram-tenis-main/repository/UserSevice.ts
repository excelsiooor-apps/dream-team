import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";
import { User } from "../entities/User";
import { DBService } from "./dbService";
import { Repository, UpdateResult, getRepository } from "typeorm";
import { Status } from "../entities/Status";
import { Game } from "../entities/Game";
import { UserDTO } from "../types/UserType";

export class UserService {
  private userRepository: Repository<User>;
  private gameRepository: Repository<Game>;
  private statusRepository: Repository<Status>;

  constructor() {
    this.userRepository = getRepository(User);
    this.gameRepository = getRepository(Game);
    this.statusRepository = getRepository(Status);
  }

  public async getUsers() {
    return DBService.withDatabase<UserDTO[]>(async ()=>{
      const queryBuilder: SelectQueryBuilder<User> = this.userRepository.createQueryBuilder('user');
      queryBuilder.orderBy('user.defeats + user.victory', 'DESC');
      const users = await queryBuilder.getMany();
      const result = users.map(user => ({
        user: user,
        totalCount: user.calculateCountGame(),
        winningPercentage: user.calculateWinningPercentage(),
      }));      
      return result;
    }) 
  }
  public async CreateUser(user: User) {
    return DBService.withDatabase<User|null>(async ()=>{
      const getUser = await this.userRepository.findOne({ where: { TelegramId: user.TelegramId } });
      if(!getUser){
        user.victory=0;
        user.defeats=0;
        const users = await this.userRepository.create(user);
        return await this.userRepository.save(users);
      }
      else{
        console.log('user exists');
        return null;
      }
    })
  }
  public async getUserButton(telegramId:number){
    return DBService.withDatabase<{
      text: string;
      callback_data: string;
  }[][] | undefined>(async()=>{
    const list = (await this.getUsers())?.filter(obj=>obj.user.TelegramId !== telegramId);
      return (list?.map((obj)=>{
        return [
          { text: `${obj.user.username}`, callback_data: `/add ${obj.user.id}` }
        ]
      }))
  })      
  }
  public async getUserById(userId:number){
    return DBService.withDatabase<User|null>(async()=>{
      const getUser = await this.userRepository.findOne({ where: { id: userId } });
      return getUser;
    })
  }
  public async getUserByTelegramId(TelegramUserId:number){
    return DBService.withDatabase<User|null>(async()=>{
      const getUser = await this.userRepository.findOne({ where: { TelegramId: TelegramUserId } });
      return getUser;
    })
  }
  public async UpdateUsers(Users: User[]){
    return DBService.withDatabase<UpdateResult[]>(async()=>{
      const updatePromises = Users.map(user => this.userRepository.update(user.id, { defeats: user.defeats, victory: user.victory }));
      const updateResults = await Promise.all(updatePromises);
      updateResults.forEach(result => {
        if (result.affected === 0) {
          console.error(`User update failed for user with id ${result.generatedMaps[0].id}`);
        }
      });  
      return updateResults;
    })
  }
}