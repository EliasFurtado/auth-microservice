import db from "../db"
import DatabaseError from "../models/errors/database.error.model"
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

    async findUserById(id: string): Promise<User> {
        try {
            const query = `
                SELECT uuid, username
                FROM user_application
                WHERE uuid = $1
            `
            const values = [id]
            const {rows} = await db.query<User>(query, values)
            const [user] = rows
    
            return user
        } catch (error){
            throw new DatabaseError('Erro na consulta por ID', error)
        }
    }

    async findUserByUsernameAndPassword(username:string, password:string): Promise<User | null>  {
        try {
            const query = `
                SELECT uuid, username
                FROM user_application
                WHERE username = $1
                AND password = crypt($2, 'my_salt')
            `
            const values = [username, password]
            const {rows} = await db.query<User>(query, values)
            const [user] = rows
            
            return user || null
        } catch (error) {
            throw new DatabaseError('Erro na consulta por usuario e senha', error)
        }
    }

    async create(user: User): Promise<string> {
        const script = `
            INSERT INTO user_application(
                username,
                password
                )
            VALUES ($1, crypt($2, 'my_salt'))
            RETURNING uuid
        `
        const values =[user.username, user.password]
        const {rows} = await db.query<{uuid: string}>(script, values)
        const [newUser] = rows
        return newUser.uuid
    }

    async update(user: User): Promise<void> {
        const script = `
            UPDATE user_application
            SET
                username = $1,
                password = crypt($2, 'my_salt')
            WHERE uuid = $3
        `
        const values =[user.username, user.password, user.uuid]
        await db.query(script, values)
    }

    async remove(uuid: string): Promise<void> {
        const script = `
            DELETE
            FROM user_application
            WHERE uuid = $1
        `
        const values = [uuid]
        await db.query(script, values)
    }
}

export default new UserRepository()