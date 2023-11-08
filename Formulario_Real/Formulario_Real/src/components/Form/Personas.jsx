import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client'

const FIND_PERSON = gql`
    query findPersonByName($nameToSearch: String!){
        findPerson(name: $nameToSearch) {
        user
        name
        surname
        country
        dni
        }
    }
`

export const Personas = ({ personas }) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson = name => {
        getPerson({ variables: { nameToSearch: name } })
    }

    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (person) {
        return (
            <div className="showPersons result">
                <h2>{person.user}</h2>
                <div>{person.name}</div>
                <div>{person.surname}</div>
                <div>{person.country}</div>
                <div>{person.dni}</div>
                <button className='close' onClick={() => { setPerson(null) }}>Close</button>
            </div>
        )
    }

    if (personas === null) return null

    return (
        <div className="showPersons">
            <h2>Personas</h2>
            {personas.map(person =>
                <div key={person.id} onClick={() => { showPerson(person.name) }}>
                    {person.name} {person.surname}
                </div>
            )}
        </div>
    )
}