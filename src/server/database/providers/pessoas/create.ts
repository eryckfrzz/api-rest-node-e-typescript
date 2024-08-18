import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models/Pessoa";

export const create = async (pessoa: Omit <IPessoa, 'id' |  'cidadeId'>): Promise <number | Error> => {

    try {
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