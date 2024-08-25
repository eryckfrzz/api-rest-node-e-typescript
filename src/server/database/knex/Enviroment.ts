import { Knex } from 'knex'
import path from 'path'

export const development : Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite') 
    },

    useNullAsDefault: true,

    migrations: {
        directory:  path.resolve(__dirname, '..', 'migrations')
    },

    seeds: {
        directory:  path.resolve(__dirname, '..', 'seeds')
    },

    pool: {
        // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON')
            done()
        }
    }

}

export const test : Knex.Config = {
    ...development,
    connection: ':memory:'
}

export const production : Knex.Config = {
    ...development,
}