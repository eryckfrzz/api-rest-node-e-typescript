import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('pessoas-getAll', () => {

    let cidadeId: number | undefined = undefined

        beforeAll(async() => {
            const cityBody = await testServer.post('/cidades').send({
                nome: 'teste'
            })

            cidadeId = cityBody.body
        })
        
    it('selecionar todos os registros', async () => {

        const res1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'Kaio Erick',
            email: 'Kayo@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const res1GetAll = await testServer.get('/pessoas').send()

        expect(Number(res1GetAll.header['x-total-count'])).toBeGreaterThan(0)
        expect(res1GetAll.statusCode).toEqual(StatusCodes.OK)
        expect(res1GetAll.body).toBeGreaterThan(0)
    })

    it('sem registros cadastrados', async () => {
        const res1 = await testServer.post('/pessoas').send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})