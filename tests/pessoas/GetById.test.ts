import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('pessoas-getById', () => {

    let cidadeId: number | undefined = undefined

    beforeAll(async() => {
        const cityBody = await testServer.post('/cidades').send({
            nome: 'teste'
        })

        cidadeId = cityBody.body
    })

    it('selecionar pessoa', async () => {
        const res1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'Erick',
            email: 'erick@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resSelect = await testServer.get(`/pessoas/${res1.body}`).send()

        expect(resSelect.statusCode).toEqual(StatusCodes.OK)
    })

    it('registro inexistente', async () => {
        const res1 = await testServer.get('/pessoas/9999')

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('sem registro cadastrado', async () => {
        const res1 = await testServer.post('/pessoas').send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)

        const res1Get = await testServer.get('/pessoas/1')

        expect(res1Get.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    })
})