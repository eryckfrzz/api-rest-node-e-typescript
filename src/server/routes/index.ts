import { Router }  from "express"

import { CidadeControllers } from '../controllers'

const router = Router()

router.get('/', (req, res) => {
    res.send('olá, mundo!')
})

router.get('/cidades', CidadeControllers.getAllValidation , CidadeControllers.getAll)
router.post('/cidades', CidadeControllers.createValidation , CidadeControllers.create)
router.get('/cidades/:id', CidadeControllers.getByIdValidation , CidadeControllers.getById)
router.put('/cidades/:id', CidadeControllers.updateByIdValidation , CidadeControllers.updateById)
router.delete('/cidades/:id', CidadeControllers.deleteByIdValidation , CidadeControllers.deleteById)

export { router }