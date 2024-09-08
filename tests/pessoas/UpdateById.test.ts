import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('pessoas-updateById', () => {

    let authToken = ''

    beforeAll(async() => {

        await testServer.post('/cadastrar').send({
            nome: 'Ana',
            email: 'ana@gmail.com',
            senha: '123456'
        })

        const ISignInProps = await testServer.post('/entrar').send({
            email: 'ana@gmail.com',
            senha: '123456'
        })

        authToken = ISignInProps.body.accessToken
    })

    let cidadeId: number | undefined = undefined

    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades')
        .set({Authorization: `Bearer ${authToken}`})
        .send({nome: 'teste'})

        cidadeId = resCidade.body

    })


    it('atualizar registro', async () => {
        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'Erickzin',
            email: 'Kaiioo@gmail.com'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const res1Get = await testServer.put(`/pessoas/${res1.body}`).set({Authorization: `Bearer ${authToken}`}).send({
            cidadeId,
            nomeCompleto: 'Kaio Erick Pereira Queiroz',
            email: 'kaioeryck@gmail.com'
        })

        expect(res1Get.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    })

    it('registro inexistente', async () => {
        const res1 = await testServer.put('/pessoas/9999').set({Authorization: `Bearer ${authToken}`})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors')
    })

    it('sem registro cadastrado', async () => {
        const res1 = await testServer.post('/pessoas').set({Authorization: `Bearer ${authToken}`}).send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)

        const res1Get = await testServer.put('/pessoas/1')

        expect(res1Get.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})