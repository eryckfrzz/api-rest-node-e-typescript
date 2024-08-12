import knex from "knex";
import { ICidade } from "../../models";
import { ETableNames } from "../../ETableNames";

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
    try {
        const result = await knex(ETableNames.cidades)
        .update({
            cidade
        })
        .where('id', '=', id)

        if(result > 0) return

        return new Error('Erro ao atualizar o registro!')
    } catch (error) {
        return new Error('Erro ao atualizar o registro!')
    }
}