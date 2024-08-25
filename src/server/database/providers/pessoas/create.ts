import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models/Pessoa";

export const create = async (pessoa: Omit <IPessoa, 'id'>): Promise <number | Error> => {

    try {
    const [{count}] = await Knex(ETableNames.pessoas)
    .where('id', '=', pessoa.cidadeId)
    .count <[{count: number}]> ('* as count')

    if(count === 0) {
        return new Error('A cidade usada não foi encontrada!')
    }
    
    const [result] = await Knex(ETableNames.pessoas)
    .insert(pessoa)
    .returning('id')

    if(typeof result === "object"){
        return result
    }else if(typeof result === "number"){
        return result
    }

    return new Error('Erro ao cadastrar o novo registro de pessoas!')
    } catch (error) {
        return new Error('Erro ao cadastrar o novo registro de pessoas!')
    }
    
}