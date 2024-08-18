import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise <void | Error> => {
    
    try {
        await Knex(ETableNames.pessoas)
        .where('id', '=', id)
        .del()
        .then(() => {
            console.log('registro de pessoa deletado com sucesso!')
        })

        return new Error('Erro ao deletar o novo registro de pessoa!')
    } catch (error) {
        return new Error('Erro ao deletar o novo registro de pessoa!')
    }
}