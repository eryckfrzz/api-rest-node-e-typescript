import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models/Pessoa";

export const getAll = async (page: number, limit: number, filter: string, id: number): Promise <IPessoa[] | Error> => {
    try {
        const pessoas = await Knex(ETableNames.pessoas)
        .select('*')
        .where('id', Number(id))
        .orWhere('nome', 'like', `%${filter}%`)
        .offset((page - 1) * limit)
        .limit(limit)

        if(id > 0 && pessoas.every(item => item.id !== id)){
            const pessoaById = Knex(ETableNames.pessoas)
            .select('*')
            .where('id', '=', id)
            .first()

            if(pessoaById) return [...pessoas, pessoaById]
        }

        return pessoas
    } catch (error) {
        return new Error('Erro ao localizar todos os registros!')
    }
}