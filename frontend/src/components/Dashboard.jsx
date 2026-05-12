import React from 'react'

export default function Dashboard({ secureMode }) {

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
              : 'O sistema está vulnerável a SQL Injection.'
          }

        </p>

      </div>

    </div>

  )

}