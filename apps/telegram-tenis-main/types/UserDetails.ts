export class UserDatails {  
  telegramId: number
  userName: string
  constructor(userId: number, userName: string) {
    this.telegramId = userId,
    this.userName = userName
  }
}