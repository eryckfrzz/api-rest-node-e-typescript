import { Router }  from "express"
import {ensureAuthenticate} from "../shared/middlewares/EnsureAuthenticate"

import { CidadeControllers, UsusarioControllers } from '../controllers'
import { PessoaControllers } from "../controllers/pessoas"

const router = Router()

router.get('/', (req, res) => {
    res.send('olá, mundo!')
})

router.get('/cidades', ensureAuthenticate, CidadeControllers.getAllValidation , CidadeControllers.getAll)
router.post('/cidades', ensureAuthenticate, CidadeControllers.createValidation , CidadeControllers.create)
router.get('/cidades/:id',ensureAuthenticate, CidadeControllers.getByIdValidation , CidadeControllers.getById)
router.put('/cidades/:id', ensureAuthenticate, CidadeControllers.updateByIdValidation , CidadeControllers.updateById)
router.delete('/cidades/:id', ensureAuthenticate, CidadeControllers.deleteByIdValidation , CidadeControllers.deleteById)

router.get('/pessoas', ensureAuthenticate, PessoaControllers.getAllValidation , PessoaControllers.getAll)
router.post('/pessoas', ensureAuthenticate, PessoaControllers.createValidation , PessoaControllers.create)
router.get('/pessoas/:id',ensureAuthenticate, PessoaControllers.getByIdValidation , PessoaControllers.getById)
router.put('/pessoas/:id', ensureAuthenticate, PessoaControllers.updateByIdValidation , PessoaControllers.updateById)
router.delete('/pessoas/:id', ensureAuthenticate, PessoaControllers.deeleteByIdValidation , PessoaControllers.deleteById)

router.post('/entrar', UsusarioControllers.SignInValidation , UsusarioControllers.SignIn)
router.post('/cadastrar', UsusarioControllers.SignUpValidation , UsusarioControllers.SignUp)

export { router }