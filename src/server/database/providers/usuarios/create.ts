import { PasswordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models/Usuario";

export const create = async (usuario: Omit <IUsuario, 'id'>): Promise <number | Error> => {
    try {

        const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha)

        const [result] = await Knex(ETableNames.usuarios)
        .insert({...usuario, senha: hashedPassword})
        .returning('id')

        if(typeof result === "object"){
            return result
        }else if(typeof result === "number"){
            return result
        }

        return new Error('Erro ao realizaar o novo registro de usuário!')
    } catch (error) {
        return new Error('Erro ao realizaar o novo registro de usuário!')
    }
}