import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('cidades-getById', () => {

    let authToken = ''

    beforeAll(async () => {
        await testServer.post('/cadastrar').send({
            nome: 'Queiroz',
            email: 'queiroz@mail.com',
            senha: '123456'
        })

        const sigInRes = await testServer.post('/entrar').send({
            email: 'queiroz@gmail.com',
            senha: '123456'
        })

        authToken = sigInRes.body.accessToken
    })
    
    it('visualizando um registro', async () => {
        const res1 = await testServer.post('/cidades').set({Authorization: `Bearer ${authToken}`}).send({
            nome: "Redenção"
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const viewOne = await testServer.get(`/cidades/${res1.body}`).set({Authorization: `Bearer ${authToken}`}).send()

        expect(viewOne.statusCode).toEqual(StatusCodes.OK)
    })
})