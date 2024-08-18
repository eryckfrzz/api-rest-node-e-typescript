import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models/Pessoa";

export const getById = async (id: number): Promise <IPessoa | Error> => {
    try {
        const pessoa = await Knex(ETableNames.pessoas)
        .select('*')
        .where('id', '=', id)
        .first()

        if(pessoa) return pessoa

        return new Error('Erro ao encontrar este registro!')
    } catch (error) {
        return new Error('Erro ao encontrar este registro!')
    }
}