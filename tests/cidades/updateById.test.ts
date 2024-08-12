import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('cidades-updateById', () => {

    it('atualizando registro', async () => {
        const res1 = await testServer.post('/cidades').send({
            nome: 'Caucaia'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const update = await testServer.put(`/cidades/${res1.body}`).send({
            nome: 'Pirambu'
        })

        expect(update.statusCode).toEqual(StatusCodes.ACCEPTED)
    })
})