import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"

interface IQueryProps{
    page?: number,
    limit?: number,
    filter?: string
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema <IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional()
    }))
}))

export const getAll  = async (req: Request <object, object, object, IQueryProps> , res: Response) => { //poderia colocar o requestHandler

    if(Number(req.query.limit || req.query.page ) < 1) return res.status(StatusCodes.BAD_REQUEST)
        
    console.log(req.query)
  
    return res.status(StatusCodes.ACCEPTED).send('solicitação feita com sucesso!')
}