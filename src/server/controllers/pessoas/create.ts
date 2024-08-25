import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { IPessoa } from "../../database/models/Pessoa"
import { PessoasProviders } from "../../database/providers/pessoas"

interface IBodyProps extends Omit <IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema <IBodyProps> (yup.object().shape({
        nomeCompleto: yup.string().required(),
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required().min(1)
    }))
}))

export const create = async (req: Request <object, object, IPessoa>, res: Response) => {

    const result = await PessoasProviders.create(req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result)

}