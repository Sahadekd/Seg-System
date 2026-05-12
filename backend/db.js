import dotenv from 'dotenv'
dotenv.config()

import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

pool.connect()
  .then(() => {
    console.log('Conectado ao PostgreSQL do Supabase')
  })
  .catch((err) => {
    console.log('Erro ao conectar no banco:')
    console.log(err)
  })

export default pool