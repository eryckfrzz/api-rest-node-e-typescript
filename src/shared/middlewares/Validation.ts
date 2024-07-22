import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import * as yup from 'yup'

type Tproperty = 'body' | 'header' | 'params' | 'query'

type TGetSchema = < T extends yup.Maybe <yup.AnyObject>> (schema: yup.ObjectSchema <T>) => yup.ObjectSchema <T> // T força a tipagem

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAllSchemas = Record < Tproperty, yup.ObjectSchema <any>>

type TGetAllSchemas = (getSchema : TGetSchema) => Partial<TAllSchemas>

type Tvalidation = (getAllSchemas: TGetAllSchemas) => RequestHandler

export const validation : Tvalidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema)

    const errorsResult : Record < string, Record < string, string >> = {}

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as Tproperty], {abortEarly: false})        
        } catch (err) {
    
            const yupError = err as yup.ValidationError //validationError é um array que contém os erros
    
            const errors : Record <string, string> = {} //objeto com par chave-valor
    
            yupError.inner.forEach(error  => {
                if(error.path == undefined) return
    
                errors[error.path] = error.message //chave = a caminho do erro, valor = a mensagem do erro 
            })

            errorsResult[key] = errors
        }
    })

    if (Object.entries(errorsResult).length == 0) {
        return next()
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsResult
        })
    }
}
