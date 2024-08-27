import { ICidade } from "../../models/Cidade";

declare module 'knex/types/tables' {
    interface Tables{
        cidades: ICidade
        pessoas: IPessoa
        usuarios: IUsuario
    }
}