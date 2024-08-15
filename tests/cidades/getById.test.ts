import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('cidades-getById', () => {
    
    it('visualizando um registro', async () => {
        const res1 = await testServer.post('/cidades').send({
            nome: "Redenção"
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const viewOne = await testServer.get(`/cidades/${res1.body}`).send()

        expect(viewOne.statusCode).toEqual(StatusCodes.OK)
    })
})