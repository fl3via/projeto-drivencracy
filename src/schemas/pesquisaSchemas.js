import joi from 'joi'

// enquete 
export const pesquisaSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.allow('')
})

// opção de voto
export const votoSchema = joi.object({
    title: joi.string().required(),
    pollId: joi.string().required()
})