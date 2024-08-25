import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models/Pessoa";

export const updateById = async (id: number, pessoa: Omit <IPessoa, 'id'>): Promise <void | Error> => {

    try {
        const [{count}] = await Knex(ETableNames.pessoas)
        .where('id', '=', pessoa.cidadeId)
        .count <[{count: number}]> ('* as count')

        if(count === 0){
            return new Error('A cidade usada não foi encontrada!')
        }

        const result = await Knex(ETableNames.pessoas)
        .update({
            pessoa
        })
        .where('id', '=', id)

        if(result > 0) return

        return new Error('Erro ao atualizar este registro!')
    } catch (error) {
        return new Error('Erro ao atualizar este registro!')
    }
}