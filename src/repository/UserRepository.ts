import { AppDataSource } from '../data/data-source'
import { Repository } from 'typeorm'
import { IRepository } from './IRepository'
import { User } from '../data/entity/User'

export class UserRepository implements IRepository<User> {
    public async findAll(): Promise<User[]> {
        const repository: Repository<User> = AppDataSource.getRepository(User)
        return repository.find()
    }
}
