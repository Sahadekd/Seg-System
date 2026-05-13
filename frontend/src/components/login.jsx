import React, { useState } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [secureMode, setSecureMode] = useState(false)

  const [logged, setLogged] = useState(false)

  const [logs, setLogs] = useState([])

  function addLog(message) {

    setLogs(prev => [
      message,
      ...prev
    ])

  }

  async function handleLogin(e) {

    e.preventDefault()

    try {

      addLog('Tentativa de login enviada...')

      const response = await axios.post(
        'http://localhost:4000/login',
        {
          email,
          password,
          secureMode
        }
      )

      console.log(response.data)

      if (response.data.success) {

        addLog('Login realizado com sucesso.')

        setLogged(true)

      }

    } catch (err) {

      addLog('Falha na autenticação.')

      alert('Login inválido')

    }

  }

  if (logged) {

    return (
      <Dashboard
        secureMode={secureMode}
        setLogged={setLogged}
      />
    )

  }

  return (

    <div className="main-container">

      <div className="left-panel">

        <h1>SecureBank</h1>

        <h2>
          SQL Injection Lab
        </h2>

        <p>
          Demonstração prática de vulnerabilidade
          SQL Injection e mitigação usando
          prepared statements.
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

        <form
          className="card"
          onSubmit={handleLogin}
          autoComplete="off"
        >

          <h2>Login</h2>

          <input
            type="email"
            placeholder="E-mail"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            autoComplete="new-password"
            value={password}
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