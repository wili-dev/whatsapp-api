import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class UserRepository implements IUserRepository {

    private users: { [key: string]: User } = {};
  
    getUser(number: string): User | undefined {
      return this.users[number];
    }
  
    addUser(number: string, user: User): void {
      console.log('addUser chamado.')
      this.users[number] = user;
    }
  }