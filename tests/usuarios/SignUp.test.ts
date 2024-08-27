import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('usuarios-SignIn', () => {
    it('registro de usuário', async () => {
        const res1 = await testServer.post('/entrar').send({
            nome: 'kayo',
            email: 'kayozin@gmail.com',
            senha: '123456'
        })

        expect(res1.status).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    })

    it('registro com email duplicado', async () => {
        const res1 = await testServer.post('/entrar').send({
            nome: 'eryck',
            email: 'kayozin@gmail.com',
            senha: '123456'
        })

        expect(res1.status).toEqual(StatusCodes.OK)

        const res2 = await testServer.post('/entrar').send({
            nome: 'julio',
            email: 'kayozin@gmail.com',
            senha: '123456'
        })

        expect(res2.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res2.body).toHaveProperty('errors')
    })

    it('registro com email muito curto', async () => {
        const res1 = await testServer.post('/entrar').send({
            nome: 'queiroz',
            email: 'ka@gmail.com',
            senha: '123456'
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors')
    })

    it('registro com senha muito curta', async () => {
        const res1 = await testServer.post('/entrar').send({
            nome: 'Pereira',
            email: 'kaio@gmail.com',
            senha: '123'
        })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors')
    })
})