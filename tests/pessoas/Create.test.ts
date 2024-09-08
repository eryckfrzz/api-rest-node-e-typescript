import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('pessoas-create', () => {

    let authToken = ''

    beforeAll(async() => {

        await testServer.post('/cadastrar').send({
            nome: 'Pereira',
            email: 'pereira@gmail.com',
            senha: '123456'
        })

        const signInRes = await testServer.post('/entrar').send({
            email: 'pereira@gmail.com',
            senha: '123456'
        })

        authToken = signInRes.body.accessToken
    })

    let cidadeId: number | undefined = undefined

    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades')
        .set({Authorization: `Bearer ${authToken}`})
        .send({nome: 'teste'})

        cidadeId = resCidade.body

    })

    it('cria registro', async () => {
        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'Erickzada',
            email: 'Kain@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1).toEqual('number')
    })

    it('tenta criar registro com email duplicado', async () => {

        const Email1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'kaio',
            email: 'kaio@gmail.com'
        })

        expect(Email1.statusCode).toEqual(StatusCodes.CREATED)

        const Email2 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'kaioerick',
            email: 'kaio@gmail.com'
        })

        expect(Email2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(Email2.body).toHaveProperty('errors')
    })

    it('registro com nome muito curto', async () => {
        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'ka',
            email: 'teste@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors')
    })

    it('registro sem nome', async () => {
        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: '',
            email: 'teste@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors')
    })

    it('registro sem nenhum dado', async () => {
        const res1 = await testServer.post('/cidades').set({Authorization: `Bearer ${authToken}`}).send({})

        expect(res1.body).toHaveProperty('errors')
    })

})