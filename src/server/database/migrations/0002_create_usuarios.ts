import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up (Knex: Knex) {
    return Knex.schema.createTable(ETableNames.usuarios, table => {
        table.bigIncrements('id').primary().index()
        table.string('nome').notNullable().checkLength('>=', 3)
        table.string('email').unique().notNullable().checkLength('>=', 5).index()
        table.string('senha').notNullable().checkLength('>=', 6)
    }).then(() => {
        console.log('tabela de usuários criada com sucesso!')
    })
}

export async function down (Knex: Knex) {
    return Knex.schema.dropTable(ETableNames.usuarios).then(() => {
        console.log('tabela de usuários deletada com sucesso!')
    })
}