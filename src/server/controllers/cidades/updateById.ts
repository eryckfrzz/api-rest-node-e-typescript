import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { ICidade } from "../../database/models/Cidade"
import { CidadesProviders } from "../../database/providers/cidades"

interface IParamProps{
    id?: number
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema <IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),

    body: getSchema <IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
    }))
}))

export const updateById  = async (req: Request <IParamProps, object, IBodyProps> , res: Response) => { //poderia colocar o requestHandler

    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro ID precisa ser informado!'
            }
        })
    }

    const result = await CidadesProviders.updateById(req.params.id, req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).json(result)
}