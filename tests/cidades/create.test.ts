import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('cidades-create', () => {
    
    it('cria registro', async () => {

        const res1 = await testServer.post('/cidades').send({
            nome: 'Redenção'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    })

    it('registro com poucos caracteres', async () => {

        const res2 = await testServer.post('/cidades').send({
            nome: 're'
        })

        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res2.body).toHaveProperty('errors.body.nome')
    })

})