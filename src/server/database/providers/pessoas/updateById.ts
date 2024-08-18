import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models/Pessoa";

export const updateById = async (id: number, pessoa: Omit <IPessoa, 'id' | 'cidadeId'>): Promise <void | Error> => {

    try {
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