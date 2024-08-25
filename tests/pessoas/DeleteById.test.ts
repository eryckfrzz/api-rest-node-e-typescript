import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('pessoas-deleteById', () => {

    let cidadeId: number | undefined = undefined

    beforeAll(async() => {
        const cityBody = await testServer.post('/cidades').send({
            nome: 'teste'
        })

        cidadeId = cityBody.body
    })

    it('deletar pessoas', async () => {

        const res1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'Kaio Erick',
            email: 'KayoErick@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resDelete = await testServer.delete(`/pessoas/${res1.body}`).send()

        expect(res1.body).toBeDefined()

        expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('registro inexistente', async () => {

        const res1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'Kaio',
            email: 'Kayozin@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resDelete = await testServer.delete('/pessoas/9999').send()

        expect(resDelete.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)

    })
})