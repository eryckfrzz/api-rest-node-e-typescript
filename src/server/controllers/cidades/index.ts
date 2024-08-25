import * as Create from './create'
import * as GetAll from './getAll'
import * as GetById from './getById'
import * as UpdateById from './updateById'
import * as DeleteById from './deleteById'

export const CidadeControllers = {
    ...Create,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...DeleteById
}