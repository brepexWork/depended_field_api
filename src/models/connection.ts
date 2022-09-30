import mysql from 'mysql2/promise'

interface IConnect {
    host: string,
    user: 'root',
    database: string
}

export const connectData:IConnect = {
    host: 'localhost',
    user: 'root',
    database: 'dependedFields'
}
