import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up (knex: Knex){
    return knex.schema.createTable(ETableNames.pessoas, table => {
        table.bigIncrements('id').primary().index()
        table.string('nomeCompleto').notNullable().index()
        table.string('email').unique().notNullable()

        table.bigInteger('cidadeId').index().notNullable().references('id').inTable(ETableNames.cidades).onUpdate('CASCADE').onDelete('RESTRICT')
        
    }).then(() => {
        console.log(`tabela ${ETableNames.pessoas} criada!`)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pessoas).then(() => {
        console.log(`tabela ${ETableNames.pessoas} deletada!`)
    })
}