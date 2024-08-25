import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { PessoasProviders } from "../../database/providers/pessoas"

interface IParamProps{
    id?: number
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema <IParamProps> (yup.object().shape({
        id: yup.number().required().integer().moreThan(0)
    }))
}))

export const getById = async (req: Request <IParamProps>, res: Response) => {

    if(! req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'o parâmetro ID precisa ser informado!'
        })
    }

    const result = await PessoasProviders.getById(req.params.id)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.OK).json(result)
}