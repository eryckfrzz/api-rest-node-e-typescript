import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"

export const count = async (filter: string): Promise <number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.pessoas)
        .where('nome', 'like', `%${filter}%`)
        .count <[{count: number}]> ('* as count')

        if(Number.isInteger(Number(count))) return Number(count)

        return new Error('Erro ao contar todos os registros!')
    } catch (error) {
        return new Error('Erro ao contar todos os registros!')
    }
}