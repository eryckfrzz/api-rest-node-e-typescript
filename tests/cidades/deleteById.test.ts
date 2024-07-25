import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('cidades-deleteById', () => {
    
    it('deletando registro', async () => {
         const res1 = await testServer.post('/cidades').send({
            nome: "Redenção"
         })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resDelete = await testServer.delete(`/cidades/${res1.body}`).send()

        expect(resDelete.statusCode).toEqual(StatusCodes.ACCEPTED)
    })

    it('números inaceitáveis', async () => {
        const resDelete = await testServer.delete('/cidades/0')

        expect(resDelete.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resDelete.body).toHaveProperty('errors.params.id')
    })
})