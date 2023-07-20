import { Router} from 'express'
import { criarEnquete, enquete } from '../controllers/enqueteControllers.js'



const rotasRouter = Router()

    rotasRouter.post('/poll', criarEnquete)
    rotasRouter.get('/poll', enquete)
   // rotasRouter.post('/choice', criarOpcao)
  //  rotasRouter.get('/poll/:id/choice', opcaoDeVoto)
  //  rotasRouter.post('/choice/:id/vote', criarVotos)
   // rotasRouter.get('/poll/:id/result', resultados)


    export default rotasRouter