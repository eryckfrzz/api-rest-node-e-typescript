import { Request, Response} from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares"
import { StatusCodes } from "http-status-codes"
import { UsuariosProviders } from "../../database/providers/usuarios"
import { IUsuario } from "../../database/models/Usuario"
import { PasswordCrypto } from "../../shared/services/PasswordCrypto"
import { JWTservice } from "../../shared/services"

interface ISignInProps extends Omit <IUsuario, 'id' | 'nome'> {}

export const SignInValidation = validation((getSchema) => ({
    body: getSchema <ISignInProps> (yup.object().shape({
        email: yup.string().email().required().min(5),
        senha: yup.string().required().min(6)
    }))
}))

export const SignIn = async (req: Request <object, object, ISignInProps>, res: Response) => {

    const {email, senha} = req.body

    const usuario = await UsuariosProviders.getByEmail(email)

    if(usuario instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos!'
            }
        })
    }

    const verify = await PasswordCrypto.verifyPassword(senha, usuario.senha)

    if(!verify){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos!'
            }
        })
    }else{

        const accessToken = JWTservice.sign({uid: Number(usuario.id)})

        if(accessToken === 'JWT_SECRET_NOT_FOUND'){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso'
                }
            })
        }

        return res.status(StatusCodes.OK).json({
            accessToken
        })
    }
    
}

