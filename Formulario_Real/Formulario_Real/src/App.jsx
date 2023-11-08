import { useState, useEffect } from 'react'
import { Form } from './components/Form/Form'
import './App.css'
import { useQuery, gql } from '@apollo/client';
import { Personas } from './components/Form/Personas'

const FORM = gql`
  query {
    users {
      user
      name
      surname
      country
      dni
    }
  }
`

function App() {
  const {data, error, loading} = useQuery(FORM)
  console.log()
  if (error) return <p>{error.message}</p>

  return (
    <>
      {loading 
      ? <p>Loading...</p>
      : (
        <>
          <Form />
          <Personas personas={data?.users} />
        </>
        )
      }
    </>
  )
}

export default App
