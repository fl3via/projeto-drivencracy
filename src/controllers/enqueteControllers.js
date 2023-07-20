import { db } from '../database/conexaomongo.js'
import dayjs from 'dayjs'
import { pesquisaSchema, votoSchema } from '../schemas/pesquisaSchemas.js'
import { ObjectId } from 'mongodb'

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

// Criar uma nova opção de voto para uma enquete
export async function criarOpcao(req, res) {
  const { title, pollId } = req.body

  const validation = votoSchema.validate(req.body, { abortEarly: false })

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message)
    return res.status(422).send(errors)
  }

  try {
    // Verificar se a enquete  existe no banco de dados
    const enquete = await db.collection('enquete').findOne({ _id: new ObjectId(pollId) })
    if (!enquete) return res.sendStatus(404)

    // Verificar se já existe uma opção de voto com o mesmo título no banco de dados
    const existingOption = await db.collection('opcaoDeVoto').findOne({ title })
    if (existingOption) {
      return res.sendStatus(409)
    }

    // Verificar se a enquete não expirou
    if (dayjs(enquete.expireAt).isBefore(dayjs())) {
      return res.sendStatus(403)
    }

    // Inserir a opção de voto no banco de dados
    await db.collection('opcaoDeVoto').insertOne({ title, pollId })
    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Obter todas as opções de voto para uma enquete
export async function opcaoDeVoto(req, res) {
  const { id } = req.params

  try {
    const enquete = await db.collection('enquete').findOne({ _id: new ObjectId(id) })
    enquete ? res.send(enquete) : res.sendStatus(404)
  
    // Buscar todas as opções de voto associadas à enquete no banco de dados
    const opcoesDeVoto = await db.collection('opcaoDeVoto').find({ pollId: id }).toArray()
    res.send(opcoesDeVoto)
  } catch (error) {
    res.status(500).send(error.message)
  }
}



