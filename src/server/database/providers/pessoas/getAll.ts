import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models/Pessoa";

export const getAll = async (page: number, limit: number, filter: string): Promise <IPessoa[] | Error> => {
    try {
        const pessoas = await Knex(ETableNames.pessoas)
        .select('*')
        .where('nomeCompleto', 'like', `%${filter}%`)
        .offset((page - 1) * limit)
        .limit(limit)
        
        return pessoas
    } catch (error) {
        return new Error('Erro ao localizar todos os registros!')
    }
}