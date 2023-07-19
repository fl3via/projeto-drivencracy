import { MongoClient, MongoClient} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

//conexão com mongo 
const mongoClient = new MongoClient(process.env.DATABASE_URL)

try {
	await mongoClient.connect()
	console.log('conectado')
} catch (err) {
	console.log(err.message)
}

export const db = mongoClient.db()
