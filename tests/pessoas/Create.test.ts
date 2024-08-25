import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('pessoas-create', () => {

    let cidadeId: number | undefined = undefined

    beforeAll(async() => {
        const cityBody = await testServer.post('/cidades').send({
            nome: 'teste'
        })

        cidadeId = cityBody.body
    })

    it('cria registro', async () => {
        const res1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'Erickzada',
            email: 'Kain@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1).toEqual('number')
    })

    it('tenta criar registro com email duplicado', async () => {

        const Email1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'kaio',
            email: 'kaio@gmail.com'
        })

        expect(Email1.statusCode).toEqual(StatusCodes.CREATED)

        const Email2 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'kaioerick',
            email: 'kaio@gmail.com'
        })

        expect(Email2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(Email2.body).toHaveProperty('errors')
    })

    it('registro com nome muito curto', async () => {
        const res1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: 'ka',
            email: 'teste@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors')
    })

    it('registro sem nome', async () => {
        const res1 = await testServer.post('/pessoas').send({
            cidadeId,
            nomeCompleto: '',
            email: 'teste@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors')
    })

    it('registro sem nenhum dado', async () => {
        const res1 = await testServer.post('/cidades').send({})

        expect(res1.body).toHaveProperty('errors')
    })

})