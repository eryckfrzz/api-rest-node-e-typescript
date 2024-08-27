import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { UsuariosProviders } from "../../database/providers/usuarios"
import { IUsuario } from "../../database/models/Usuario"

interface ISignUpProps extends Omit <IUsuario, 'id'> {}

export const SignUpValidation = validation((getSchema) => ({
    body: getSchema <ISignUpProps> (yup.object().shape({
        nome: yup.string().required().min(3),
        senha: yup.string().required().min(6),
        email: yup.string().email().required().min(5)
    }))
}))

export const SignUp = async (req: Request <object, object, ISignUpProps>, res: Response) => {

    const result = await UsuariosProviders.create(req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
         })
     }

    return res.status(StatusCodes.CREATED).json(result)
}