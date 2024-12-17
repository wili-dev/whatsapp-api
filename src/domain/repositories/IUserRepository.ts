import { User } from "../entities/User.js";

export interface IUserRepository {

    getUser(number: string): User | undefined;
    addUser(number: string, user: User): void;
}