import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise <void | Error> => {

    try {
        await Knex(ETableNames.cidades)
        .where('id', '=', id)
        .del()
        .then(() => {
            console.log('Registro deletado com sucesso!')
        })

        return new Error('Erro ao deletar o registro!')

    } catch (error) {
        return new Error('Erro ao deletar o registro!')
    }
}