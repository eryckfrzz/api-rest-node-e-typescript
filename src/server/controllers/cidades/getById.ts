import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { CidadesProviders } from "../../database/providers/cidades"

interface IParamProps {
    id?: number
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema <IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}))

export const getById  = async (req: Request <IParamProps> , res: Response) => { //poderia colocar o requestHandler

    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro ID precisa ser informado!'
            }
        })
    }

    const cidade = await CidadesProviders.getById(Number(req.params.id))

    if(cidade instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: cidade.message
            }
        })
    }

    return res.status(StatusCodes.OK).json(cidade)
}