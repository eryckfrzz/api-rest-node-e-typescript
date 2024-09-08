import * as jwt from 'jsonwebtoken'

interface IJwtdata {
    uid: number
}

const sign = (data: IJwtdata) => {
    if(! process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'

    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '24h'})
}

const verify = (token: string): IJwtdata | 'JWT_SECRET_NOT_FOUND'
| 'INVALID_TOKEN' => {
    
    if(! process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(typeof decoded === 'string'){
             return 'INVALID_TOKEN'
        }

        return decoded as IJwtdata
    } catch (error) {
        return 'INVALID_TOKEN'
    }

}

export const JWTservice = {
    sign,
    verify
}