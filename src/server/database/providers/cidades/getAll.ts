import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames"
import { ICidade } from "../../models/Cidade"

export const getAll = async (page: number, limit: number, filter: string, id: number): Promise <ICidade[] | Error> => {
    try {
        const cidades = await Knex(ETableNames.cidades)
        .select('*')
        .where('id', Number(id))
        .orWhere('nome', 'like', `%${filter}%`)
        .offset((page - 1) * limit)
        .limit(limit)

        if(id > 0 && cidades.every(item => item.id !== id)){
            const cidadeById = await Knex(ETableNames.cidades)
            .select('*')
            .where('id', '=', id)
            .first()
            if(cidadeById) return [...cidades, cidadeById]
        }
        
        return cidades
    } catch (error) {
        return new Error('Erro ao visualizar todos os registros!')
    }
}