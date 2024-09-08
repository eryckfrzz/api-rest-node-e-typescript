import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('pessoas-getById', () => {

    let authToken = ''

    beforeAll(async() => {

        await testServer.post('/cadastrar').send({
            nome: 'Julião',
            email: 'juliao@gmail.com',
            senha: '123456'
        })

        const ISignInProps = await testServer.post('/entrar').send({
            email: 'juliao@gmail.com',
            senha: '123456'
        })

        authToken = ISignInProps.body.accessToken
    })

    let cidadeId: number | undefined = undefined

    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades')
        .set({Authorization: `Bearer ${authToken}`})
        .send({nome: 'teste'})

        cidadeId = resCidade.body

    })


    it('selecionar pessoa', async () => {
        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'Erick',
            email: 'erick@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resSelect = await testServer.get(`/pessoas/${res1.body}`).set({Authorization: `Bearer ${authToken}`}).send()

        expect(resSelect.statusCode).toEqual(StatusCodes.OK)
    })

    it('registro inexistente', async () => {
        const res1 = await testServer.set({Authorization: `Bearer ${authToken}`}).get('/pessoas/9999')

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('sem registro cadastrado', async () => {
        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)

        const res1Get = await testServer.get('/pessoas/1')

        expect(res1Get.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    })
})