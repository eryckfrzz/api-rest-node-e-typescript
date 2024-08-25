import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { PessoasProviders } from "../../database/providers/pessoas"

interface IQueryProps{
    page?: number,
    limit?: number,
    filter?: string,
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema <IQueryProps> (yup.object().shape({
        page: yup.number().optional().moreThan(0).default(1),
        limit: yup.number().optional().moreThan(0).default(10),
        filter: yup.string().optional().default('')
    }))
}))

export const getAll = async (req: Request <object, object, object, IQueryProps>, res: Response) => {

    const result = await PessoasProviders.getAll(Number(req.query.page) || 1, Number(req.query.limit) || 10, String(req.query.filter) || '')

    const totalCounts = await PessoasProviders.count(String(req.query.filter))

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
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

    return res.status(StatusCodes.OK).json(result)
}