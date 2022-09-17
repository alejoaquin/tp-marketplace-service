import { AppDataSource } from './data/data-source'
import { Student } from './data/entity/Student'

export const Bootstrap = async () => {
    const date = new Date(1996, 7, 5)

    const studentRepository = AppDataSource.getRepository(Student)
    const student = studentRepository.create({
        firstname: 'ale',
        lastname: 'joaquin',
        phone: 123,
        email: 'mail',
        password: 'pass',
        role: 'role',
        notifications: [],
        birthday: date,
        educationalDegrees: [],
        comments: [],
        scorings: [],
        courseRequests: [],
        courses: [],
    })

    await studentRepository.save(student).catch((err) => {
        console.log('Error: ', err)
    })

    console.log('New student saved', student)
}
