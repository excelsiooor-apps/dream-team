import { StatusService } from './StatusService';
import { GameService } from "./GameService";
import { UserService } from "./UserSevice";

export class DBService{
  public userService = new UserService();
  public gameService = new GameService();
  public statusService = new StatusService();
}


