import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const create = async (cidade: Omit<ICidade, 'id'>):Promise <number | Error> => {

    try {

        const [result] = await Knex(ETableNames.cidades)
        .insert(cidade)
        .returning('id')

        if(typeof result === 'object'){
            return result.id
        }else if(typeof result === 'number'){
           return result
        }
        
        return new Error('erro ao registrar a cidade!')
    } catch (error) {
        return new Error('erro ao registrar a cidade!')
    }
}