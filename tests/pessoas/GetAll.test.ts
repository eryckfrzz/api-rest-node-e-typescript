import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('pessoas-getAll', () => {

    let authToken = ''

        beforeAll(async() => {
            await testServer.post('/cadastrar').send({
                nome: 'kain',
                email: 'Kain@gmail.com',
                senha: '123456'
            })

            const signInRes = await testServer.post('/entrar').send({
                email: 'kain@gmail.com',
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

        
    it('selecionar todos os registros', async () => {

        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'Kaio Erick',
            email: 'Kayo@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const res1GetAll = await testServer.get('/pessoas').set({Authorization: `Bearer ${authToken}`}).send()

        expect(Number(res1GetAll.header['x-total-count'])).toBeGreaterThan(0)
        expect(res1GetAll.statusCode).toEqual(StatusCodes.OK)
        expect(res1GetAll.body).toBeGreaterThan(0)
    })

    it('sem registros cadastrados', async () => {
        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})