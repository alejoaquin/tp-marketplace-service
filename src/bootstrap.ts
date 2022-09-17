import { AppDataSource } from './data/data-source'
import { User } from './data/entity/User'

export const Bootstrap = async () => {
    const userRepository = AppDataSource.getRepository(User)
    const user = userRepository.create({
        firstName: 'Ale',
        lastName: 'Joaquin',
        age: 26,
    })

    await userRepository.save(user).catch((err) => {
        console.log('Error: ', err)
    })

    console.log('New user saved', user)
}
