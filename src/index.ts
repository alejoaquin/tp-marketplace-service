import { Bootstrap } from './bootstrap'
import { AppDataSource } from './data/data-source'
import { User } from './data/entity/User'

AppDataSource.initialize()
    .then(async () => {
        /*
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Ale"
    user.lastName = "Joaquin"
    user.age = 26
    
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")
*/
        await Bootstrap().catch((err) => {
            console.log(err)
        })
    })
    .catch((error) => console.log(error))
