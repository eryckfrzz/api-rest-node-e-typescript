import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTservice } from "../services";

export const ensureAuthenticate:RequestHandler = async (req, res, next) => {
    const {authorization} = req.headers

    console.log(req.headers)

    if(!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autorizado!'
            }
        })
    }

    const [type, token] = authorization.split(' ')

    if(type !== 'Bearer'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autorizado!'
            }
        })
    }

    const jwtData = JWTservice.verify(token)

    if(jwtData == 'JWT_SECRET_NOT_FOUND'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao verificar o token de acesso'
            }
        })
    }else if(jwtData == 'INVALID_TOKEN'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autenticado!'
            }
        })
    }

    req.headers.idUsuario = jwtData.uid.toString()

    return next()
}