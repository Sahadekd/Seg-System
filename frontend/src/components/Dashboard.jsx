import React from 'react'

export default function Dashboard({
  secureMode,
  setLogged
}) {

  return (

    <div className="dashboard">

      <div className="dashboard-card">

        <h1>
          Login realizado!
        </h1>

        <p>

          {
            secureMode
              ? 'O sistema bloqueou SQL Injection.'
              : 'O sistema foi comprometido via SQL Injection.'
          }

        </p>

        <button
          className="logout-btn"
          onClick={() => setLogged(false)}
        >

          Voltar ao Login

        </button>

      </div>

    </div>

  )

}