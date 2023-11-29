import { Repository, getRepository } from "typeorm";
import { Status } from "../entities/Status";
import { DBService } from "./dbService";

export class StatusService {
  private statusRepository: Repository<Status>;

  constructor() {
    this.statusRepository = getRepository(Status);
  }

  public async getStatus() {
    return DBService.withDatabase<Status[]>(async () =>{
      const result = await this.statusRepository.find();
      console.log('LOG Status', result)
      return result;
    })
}
}