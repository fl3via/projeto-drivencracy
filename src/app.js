import express from 'express'
import cors from 'cors'
import rotasRouter from './routes/routes.js'


const app = express()

app.use(express.json())
app.use(cors())
app.use(rotasRouter)

// Inicie o servidor na porta 5000
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`))
