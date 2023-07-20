import { db } from '../database/conexaomongo.js'
import dayjs from 'dayjs'
import { pesquisaSchema } from '../schemas/pesquisaSchemas.js'

// Função auxiliar para formatar a data de expiração
export async function formatExpireDate(expireAt) {
  return expireAt ? dayjs(expireAt).format('YYYY-MM-DD HH:mm') : dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
}

// Criar uma nova enquete
export async function criarEnquete(req, res) {
  const { title, expireAt: requestedExpireAt } = req.body

  const validation = pesquisaSchema.validate(req.body, { abortEarly: false })

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message)
    return res.status(422).send(errors)
  }

  try {
    // Formatar a data de expiração, caso não esteja presente
    const formattedExpireAt = formatExpireDate(requestedExpireAt)

    // Inserir a enquete no banco de dados
    await db.collection('enquete').insertOne({ title, expireAt: formattedExpireAt })
    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Obter todas as enquetes
export async function enquete(req, res) {
  try {
 
    const enquetes = await db.collection('enquete').find().toArray()
    res.send(enquetes)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

