import { ICidade } from "../../models";

declare module 'knex/types/tables' {
    interface Tables{
        cidades: ICidade
        // pessoas: IUsuario
        // usuarios: IUsuario
    }
}