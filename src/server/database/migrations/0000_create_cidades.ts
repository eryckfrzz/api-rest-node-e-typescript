import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
   knex.schema.createTable(ETableNames.cidades, table => {
    table.bigIncrements('id').primary().index()
    table.string('nome', 150).index().notNullable()

    table.comment('Tabela para armazenar as cidades!')
   }).then(() => {
    console.log(`tabela ${ETableNames.cidades} criada!`)
   })
}


export async function down(knex: Knex) {
    knex.schema.dropTable(ETableNames.cidades).then(() => {
        console.log(`tabela ${ETableNames.cidades} excluída!`)
       })
}

