import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const app = express()

app.use(cors())

app.use(express.json())

// ==========================
// TESTE BANCO
// ==========================

pool.connect()
  .then(() => {
    console.log('Conectado ao PostgreSQL do Supabase')
  })
  .catch((err) => {
    console.log(err)
  })

// ==========================
// LOGIN
// ==========================

app.post('/login', async (req, res) => {

  const {
    email,
    password,
    secureMode
  } = req.body

  try {

    // ==========================
    // MODO SEGURO
    // ==========================

    if (secureMode) {

      const query = `
        SELECT * FROM users
        WHERE email = $1
        AND password = $2
      `

      console.log('\n🟩 QUERY SEGURA:')
      console.log(query)

      const result = await pool.query(
        query,
        [email, password]
      )

      console.log(result.rows)

      if (result.rows.length > 0) {

        return res.json({
          success: true
        })

      }

      return res.status(401).json({
        success: false
      })

    }

    // ==========================
    // MODO VULNERÁVEL
    // ==========================

    const query = `
      SELECT * FROM users
      WHERE email = '${email}'
      AND password = '${password}'
    `

    console.log('\n🟥 QUERY VULNERÁVEL:')
    console.log(query)

    const result = await pool.query(query)

    console.log(result.rows)

    if (result.rows.length > 0) {

      return res.json({
        success: true
      })

    }

    return res.status(401).json({
      success: false
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      error: error.message
    })

  }

})

// ==========================
// START SERVER
// ==========================

app.listen(4000, () => {

  console.log('🚀 Servidor rodando na porta 4000')

})