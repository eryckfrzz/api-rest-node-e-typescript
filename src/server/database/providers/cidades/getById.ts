import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ICidade } from "../../models/Cidade"

export const getById = async (id: number): Promise <ICidade | Error> => {

    try {
        const cidade = await Knex(ETableNames.cidades)
        .select('*')
        .where('id', '=', id)
        .first()

        if(cidade) return cidade

        return new Error('Registro não encontrado!')
    } catch (error) {
        return new Error('Registro não encontrado!')
    }
}