import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('pessoas-updateById', () => {

    let cidadeId: number | undefined = undefined

    beforeAll(async() => {
        const cityBody = await testServer.post('/cidades').send({
            nome: 'teste'
        })

        cidadeId = cityBody.body
    })

    it('atualizar registro', async () => {
        const res1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'Erickzin',
            email: 'Kaiioo@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const res1Get = await testServer.put(`/pessoas/${res1.body}`).send({
            cidadeId,
            nomeCompleto: 'Kaio Erick Pereira Queiroz',
            email: 'kaioeryck@gmail.com'
        })

        expect(res1Get.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    })

    it('registro inexistente', async () => {
        const res1 = await testServer.put('/pessoas/9999')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors')
    })

    it('sem registro cadastrado', async () => {
        const res1 = await testServer.post('/pessoas').send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)

        const res1Get = await testServer.put('/pessoas/1')

        expect(res1Get.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})