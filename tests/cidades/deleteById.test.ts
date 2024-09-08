import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('cidades-deleteById', () => {

    let authToken = ''

    beforeAll(async () => {
        await testServer.post('/cadastrar').send({
            nome: 'Erick',
            email: 'Erick123@gmail.com',
            senha: '123456'
        })

        const signInRes = await testServer.post('/entrar').send({
            email: 'Erick123@gmail.com',
            senha: '123456'
        })

        authToken = signInRes.body.accessToken
    })
    
    it('deletando registro', async () => {
         const res1 = await testServer.post('/cidades').set({Authorization: `Bearer ${authToken}`}).send({
            nome: "Redenção"
         })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resDelete = await testServer.delete(`/cidades/${res1.body}`).set({Authorization: `Bearer ${authToken}`}).send()

        expect(resDelete.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    })
})