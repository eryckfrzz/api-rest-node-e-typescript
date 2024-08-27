import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IUsuario } from "../../models/Usuario"

export const getByEmail = async (email: string): Promise <IUsuario | Error> => {

    try {
        const result = await Knex(ETableNames.usuarios)
        .select('*')
        .where('email', '=', email)
        .first()

        if(result) return result

        return new Error('Erro ao localizar o ID deste registro')
    } catch (error) {
        return new Error('Erro ao localizar o ID deste registro') 
    }
    
}