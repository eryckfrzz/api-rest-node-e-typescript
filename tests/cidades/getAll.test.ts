import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('cidades-getAll', () => {

    let authToken = ''

    beforeAll(async () => {
        await testServer.post('/cadastrar').send({
            nome: 'Ana Clara',
            email: 'Ana@gmail.com',
            senha: '123456'
        })

        const signInRes = await testServer.post('/entrar').send({
            email: 'Ana@gmail.com',
            senha: '123456'
        })

        authToken = signInRes.body.accessToken
    })

    it('ver registros', async () => {

        const res1 = await testServer.post('/cidades').set({Authorization: `Bearer ${authToken}`}).send({
            nome: "Fortaleza",
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const viewAll = await testServer.get('/cidades').set({Authorization: `Bearer ${authToken}`}).send()

        expect(viewAll.statusCode).toEqual(StatusCodes.OK)
    })
})