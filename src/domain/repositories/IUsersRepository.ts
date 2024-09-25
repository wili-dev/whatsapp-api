import { User } from "../entities/User.js";

export interface IUsersRepository {

    getUsers(): Promise<{}>;
    getUser(phone_user: string): Promise<User | undefined>;
    addUser(user: User): Promise<void>;
    removeUser(phone_user: string): Promise<void>;
    saveUserState(user: User): Promise<void>;
}