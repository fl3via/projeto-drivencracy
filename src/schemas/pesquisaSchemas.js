import joi from 'joi'

// enquete 
export const pesquisaSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.allow('')
})