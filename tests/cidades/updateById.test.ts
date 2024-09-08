import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('cidades-updateById', () => {

    let authToken = ''

    beforeAll(async () => {

        await testServer.post('/cadastrar').send({
            nome: 'Creuza',
            email: 'creuza@gmail.com',
            senha: '1234567'
        })

        const sigInRes = await testServer.post('/entrar').send({
            email: 'creuza@gmail.com',
            senha: '1234567'
        })

        authToken = sigInRes.body.accessToken

    })

    it('atualizando registro', async () => {
        const res1 = await testServer.post('/cidades').set({Authorization: `Bearer ${authToken}`}).send({
            nome: 'Caucaia'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const update = await testServer.put(`/cidades/${res1.body}`).set({Authorization: `Bearer ${authToken}`}).send({
            nome: 'Pirambu'
        })

        expect(update.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    })
})