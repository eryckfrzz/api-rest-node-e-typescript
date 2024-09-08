import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('cidades-create', () => {

    let authToken = ''

    beforeAll(async () => {

        await testServer.post('/cadastrar').send({
            nome: 'Kayo',
            email: 'Kayo@gmail.com',
            senha: '123456'
        })

        const sigInRes = await testServer.post('/entrar').send({
            email: 'Kayo@gmail.com',
            senha: '123456'
        })

        authToken = sigInRes.body.accessToken

    })

    it('Tenta criar registro sem token de acesso', async () => {
        const res1 = await testServer.post('/cidades').set({Authorization: `Bearer ${authToken}`}).send({
            nome: 'Fortaleza'
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors')
    })

    it('cria registro', async () => {

        const res1 = await testServer.post('/cidades')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
            nome: 'Redenção'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
        expect(res1.body).toHaveProperty('accessToken')
    })

    it('registro com poucos caracteres', async () => {

        const res2 = await testServer.post('/cidades').set({Authorization: `Bearer ${authToken}`}).send({
            nome: 're'
        })

        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res2.body).toHaveProperty('errors.body.nome')
    })

})