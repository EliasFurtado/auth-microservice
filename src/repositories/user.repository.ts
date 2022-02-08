import db from "../db"
import User from "../models/user.model"



class UserRepository {


    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, username
            FROM user_application
        `
        const {rows} = await db.query<User>(query)
        return rows || []
    }

    async findUserById(id: string): Promise<User[]> {
        const query = `
            SELECT uuid, username
            FROM user_application
            WHERE uuid = $1
        `
        const values = [id]
        const {rows} = await db.query<User>(query, values)
        const user = rows

        return user
    }
}

export default new UserRepository()