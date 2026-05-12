import React, { useState } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logged, setLogged] = useState(false)

  const [secureMode, setSecureMode] = useState(false)

  const [logs, setLogs] = useState([])

  async function handleLogin(e) {

    e.preventDefault()

    const route = secureMode
      ? 'login-secure'
      : 'login-vulnerable'

    try {

      addLog('Tentativa de login enviada...')

      const response = await axios.post(
        `http://localhost:4000/${route}`,
        {
          email,
          password
        }
      )

      if (response.data.success) {

        addLog('Login realizado com sucesso.')

        setLogged(true)

      }

    } catch (err) {

      addLog('Falha na autenticação.')

      alert('Login inválido')

    }

  }

  function addLog(message) {

    setLogs(prev => [
      message,
      ...prev
    ])

  }

  if (logged) {
    return <Dashboard secureMode={secureMode} />
  }

  return (

    <div className="main-container">

      <div className="left-panel">

        <h1>SecureBank</h1>

        <h2>
          Laboratório de SQL Injection
        </h2>

        <p>
          Demonstração prática de vulnerabilidade
          e mitigação utilizando PostgreSQL,
          Node.js e React.
        </p>

        <div className={
          secureMode
            ? 'status secure'
            : 'status vulnerable'
        }>

          {
            secureMode
              ? '🟩 MODO SEGURO'
              : '🟥 MODO VULNERÁVEL'
          }

        </div>

        <button
          className="toggle-btn"
          onClick={() => setSecureMode(!secureMode)}
        >

          {
            secureMode
              ? 'Desativar Proteção'
              : 'Ativar Proteção'
          }

        </button>

      </div>

      <div className="right-panel">

        <form className="card" onSubmit={handleLogin}>

          <h2>Login</h2>

          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Entrar
          </button>

        </form>

        <div className="logs">

          <h3>Logs do Sistema</h3>

          {
            logs.map((log, index) => (
              <p key={index}>
                {log}
              </p>
            ))
          }

        </div>

      </div>

    </div>

  )

}