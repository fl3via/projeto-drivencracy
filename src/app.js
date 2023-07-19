import express from 'express'
import cors from 'cors'
import votoRouter from './routes/voto.routes.js'


const app = express()

app.use(express.js())
app.use(cors())
app.use(votoRouter)

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`))
