import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('usuarios-SignIn', () => {
    beforeAll(async () => {
        await testServer.post('/cadastrar').send({
            nome: 'Ana Clara',
            email: 'Ana@gmail.com',
            senha: '123456'
        })
    })

    it('login realizado', async () => {
        const res1 = await testServer.post('/entrar').send({
            email: 'Ana@gmail.com',
            senha: '123456'
        })

        expect(res1.status).toEqual(StatusCodes.OK)
        expect(res1.body).toHaveProperty('accessToken')
    })


    it('login com email muito curto', async () => {
        const res1 = await testServer.post('/entrar').send({
            email: 'a@gmail.com',
            senha: '123456'
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors')
    })

    it('login com senha muito curta', async () => {
        const res1 = await testServer.post('/entrar').send({
            email: 'Ana@gmail.com',
            senha: '16'
        })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors')
    })

    it('login com senha errada', async () => {
        const res1 = await testServer.post('/entrar').send({
            email: 'Ana@gmail.com',
            senha: '1242252535'
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors')
    })

    it('login com email errado', async () => {
        const res1 = await testServer.post('/entrar').send({
            email: 'Anacalssadq@gmail.com',
            senha: '123456'
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors')
    })
})