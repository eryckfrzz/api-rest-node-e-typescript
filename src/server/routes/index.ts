import { Router }  from "express"

import { CidadeControllers } from '../controllers'
import { PessoaControllers } from "../controllers/pessoas"

const router = Router()

router.get('/', (req, res) => {
    res.send('olá, mundo!')
})

router.get('/cidades', CidadeControllers.getAllValidation , CidadeControllers.getAll)
router.post('/cidades', CidadeControllers.createValidation , CidadeControllers.create)
router.get('/cidades/:id', CidadeControllers.getByIdValidation , CidadeControllers.getById)
router.put('/cidades/:id', CidadeControllers.updateByIdValidation , CidadeControllers.updateById)
router.delete('/cidades/:id', CidadeControllers.deleteByIdValidation , CidadeControllers.deleteById)

router.get('/pessoas', PessoaControllers.getAllValidation , PessoaControllers.getAll)
router.post('/pessoas', PessoaControllers.createValidation , PessoaControllers.create)
router.get('/pessoas/:id', PessoaControllers.getByIdValidation , PessoaControllers.getById)
router.put('/pessoas/:id', PessoaControllers.updateByIdValidation , PessoaControllers.updateById)
router.delete('/pessoas/:id', PessoaControllers.deeleteByIdValidation , PessoaControllers.deleteById)

export { router }