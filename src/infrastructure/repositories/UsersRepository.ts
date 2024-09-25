import { User } from "../../domain/entities/User.js";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository.js";

export class UsersRepository implements IUsersRepository {

    private users: { [key: string]: User };

    constructor() {
        this.users = {};
    }

    async getUser(phone_user: string): Promise<User | undefined> {

        const user = this.users[phone_user];
        return user;
    }

    async getUsers(): Promise<{}> {
        return {};
    }

    async addUser(user: User): Promise<void> {

        this.users[user.getId()] = user;

        console.log(this.users);
    }

    async removeUser(phone_user: string): Promise<void> {

    }

    async saveUserState(user: User): Promise<void> {

    }
}