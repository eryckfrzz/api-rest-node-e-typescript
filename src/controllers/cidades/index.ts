import * as create from './create'
import * as getAll from './getAll'
import * as getById from './get-By-Id'
import * as updateById from './update-By-Id'
import * as deleteById from './delete-By-Id'

export const CidadeControllers = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById
}