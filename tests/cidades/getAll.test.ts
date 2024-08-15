import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('cidades-getAll', () => {

    it('ver registros', async () => {

        const res1 = await testServer.post('/cidades').send({
            nome: "Fortaleza",
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const viewAll = await testServer.get('/cidades').send()

        expect(viewAll.statusCode).toEqual(StatusCodes.OK)
    })
})