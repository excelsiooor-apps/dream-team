import { User } from "../entities/User"

export interface UserData {
  userId: number
  messageText: string
  userFirstName: string
}

export interface UserDTO {
  user: User,
  totalCount: number,
  winningPercentage: number
}