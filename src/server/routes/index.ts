import { Router }  from "express"
import {StatusCodes} from "http-status-codes"

const router = Router()

router.get('/', (req, res) => {
    res.send('olá, mundo!')
})

router.post('/teste', (req, res) => {
    console.log(req.body)

    res.status(StatusCodes.BAD_REQUEST).json(req.body)
})

export { router }