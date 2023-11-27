import { connectDatabase, disconnectDatabase } from "../connector";
import { Status } from "../entities/Status";

export class StatusService {
  public async getStatus() {
    let connection;  
    try {
      connection = await connectDatabase();
      const StatusRepository = connection.getRepository(Status);
      const result = await StatusRepository.find();
      console.log('LOG Status', result)
      return result;
    }
    catch{
      console.error('Error')
    }
    finally{
      if (connection) {
        await disconnectDatabase(connection);
      }
    }
  }
}