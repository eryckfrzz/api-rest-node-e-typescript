import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('pessoas-deleteById', () => {

    let authToken = ''

    beforeAll(async() => {

        await testServer.post('/cadastrar').send({
            nome: 'Maylon',
            email: 'maylon@gmail.com',
            senha: '123456'
        })

        const sigInRes = await testServer.post('/entrar').send({
            email: 'maylon@gmail.com',
            senha: '123456'
        })

        authToken = sigInRes.body.accessToken
    })

    let cidadeId: number | undefined = undefined

    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades')
        .set({Authorization: `Bearer ${authToken}`})
        .send({nome: 'teste'})

        cidadeId = resCidade.body

    })


    it('deletar pessoas', async () => {

        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'Kaio Erick',
            email: 'KayoErick@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resDelete = await testServer.delete(`/pessoas/${res1.body}`).set({Authorization: `Bearer ${authToken}`}).send()

        expect(res1.body).toBeDefined()

        expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('registro inexistente', async () => {

        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'Kaio',
            email: 'Kayozin@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resDelete = await testServer.delete('/pessoas/9999').set({Authorization: `Bearer ${authToken}`}).send()

        expect(resDelete.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)

    })
})