import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { IPessoa } from "../../database/models/Pessoa"
import { PessoasProviders } from "../../database/providers/pessoas"

interface IParamProps{
    id?: number
}

interface IBodyProps extends Omit <IPessoa, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema <IParamProps> (yup.object().shape({
        id: yup.number().required().integer().moreThan(0)
    })),

    body: getSchema <IBodyProps> (yup.object().shape({
        nomeCompleto: yup.string().required().min(15),
        email: yup.string().required().min(15).email(),
        cidadeId: yup.number().required().integer().moreThan(0)
    }))
}))

export const updateById = async (req: Request <IParamProps, object, IBodyProps> , res: Response) => {

    if(! req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: 'o parâmetro ID precisa ser informado!'
        })
    }

    const result = await PessoasProviders.updateById(req.params.id, req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).json(result)
}
