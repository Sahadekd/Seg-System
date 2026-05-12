import express from 'express'
import cors from 'cors'
import pool from './db.js'

const app = express()

app.use(cors())
app.use(express.json())

// ===============================
// LOGIN VULNERÁVEL
// ===============================

app.post('/login-vulnerable', async (req, res) => {

  const { email, password } = req.body

  try {

    const query = `
      SELECT * FROM users
      WHERE email = '${email}'
      AND password = '${password}'
    `

    console.log('\n🟥 QUERY VULNERÁVEL:')
    console.log(query)

    const result = await pool.query(query)

    if (result.rows.length > 0) {

      return res.json({
        success: true,
        mode: 'vulnerable',
        query
      })

    }

    return res.status(401).json({
      success: false
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: error.message
    })

  }

})

// ===============================
// LOGIN SEGURO
// ===============================

app.post('/login-secure', async (req, res) => {

  const { email, password } = req.body

  try {

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

    if (result.rows.length > 0) {

      return res.json({
        success: true,
        mode: 'secure'
      })

    }

    return res.status(401).json({
      success: false
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: error.message
    })

  }

})

app.listen(4000, () => {
  console.log('🚀 Servidor rodando na porta 4000')
})