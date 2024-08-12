import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { CidadesProviders } from "../../database/providers/cidades"

export interface IQueryProps{
    page?: number,
    limit?: number,
    filter?: string,
    id?: number
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema <IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
        id: yup.number().integer().optional().moreThan(0).default(0)
    })),
}))

export const getAll  = async (req: Request <object, object, IQueryProps> , res: Response) => { //poderia colocar o requestHandler

    const cidades = await CidadesProviders.getAll(Number(req.query.page), Number(req.query.limit), String(req.query.filter), Number(req.query.id))

    const totalCounts = await CidadesProviders.count(String(req.query.filter))

    if(cidades instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: cidades.message
            }
        })
    }else if(totalCounts instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: totalCounts.message
            }
        })
    }

    res.setHeader('access-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', totalCounts)

    return res.status(StatusCodes.OK).json(cidades)

}